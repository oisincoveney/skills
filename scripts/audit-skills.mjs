#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const required = new Set(["imagegen", "inspect", "quick", "schedule-graph-shaping"]);
const explicitExternal = new Set([]);
const errors = [];
const nameRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) { errors.push(message); }
function rel(path) { return path.slice(root.length + 1); }
function parseFrontmatter(text, file) {
  if (!text.startsWith("---\n")) {
    fail(`${file}: missing YAML frontmatter`);
    return {};
  }
  const end = text.indexOf("\n---", 4);
  if (end < 0) {
    fail(`${file}: unterminated YAML frontmatter`);
    return {};
  }
  const data = {};
  for (const line of text.slice(4, end).split(/\r?\n/)) {
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (match) data[match[1]] = match[2].replace(/^['\"]|['\"]$/g, "").trim();
  }
  return data;
}
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

if (!existsSync(skillsRoot)) fail("skills/ directory is missing");
const skillIds = existsSync(skillsRoot)
  ? readdirSync(skillsRoot).filter((entry) => statSync(join(skillsRoot, entry)).isDirectory()).sort()
  : [];
const skillSet = new Set(skillIds);
for (const id of required) {
  if (!skillSet.has(id)) fail(`required skill '${id}' is missing`);
}
for (const id of skillIds) {
  if (!nameRe.test(id)) fail(`skill '${id}' is not lowercase hyphenated`);
  const dir = join(skillsRoot, id);
  const skillFiles = readdirSync(dir).filter((entry) => entry === "SKILL.md");
  if (skillFiles.length !== 1) fail(`${rel(dir)}: expected exactly one SKILL.md`);
  const file = join(dir, "SKILL.md");
  if (!existsSync(file)) continue;
  const text = readFileSync(file, "utf8");
  const data = parseFrontmatter(text, rel(file));
  if (data.name !== id) fail(`${rel(file)}: frontmatter name '${data.name ?? ""}' must equal '${id}'`);
  if (!data.description) fail(`${rel(file)}: frontmatter description is required`);
}

const markdownFiles = existsSync(skillsRoot) ? walk(skillsRoot).filter((file) => file.endsWith(".md")) : [];
for (const file of markdownFiles) {
  const text = readFileSync(file, "utf8");
  const base = dirname(file);
  const linkRe = /\[[^\]]+\]\(([^)]+)\)/g;
  for (const match of text.matchAll(linkRe)) {
    const target = match[1].split("#")[0];
    if (!target || /^[a-z]+:/i.test(target) || target.startsWith("mailto:")) continue;
    const resolved = normalize(join(base, target));
    if (!existsSync(resolved)) fail(`${rel(file)}: broken relative link '${match[1]}'`);
  }
  const refs = [
    ...[...text.matchAll(/\[\[([a-z0-9-]+)\]\]/g)].map((m) => m[1]),
    ...[...text.matchAll(/\$([a-z][a-z0-9-]*)\b/g)].map((m) => m[1]),
    ...[...text.matchAll(/`([a-z][a-z0-9-]*)`/g)].map((m) => m[1]),
  ];
  for (const ref of refs) {
    if (explicitExternal.has(ref)) continue;
    if (skillSet.has(ref)) continue;
    // Backtick references often contain commands, flags, packages, or plain values. Only fail obvious skill-like references.
    if (text.includes(`[[${ref}]]`) || text.includes(`$${ref}`)) {
      fail(`${rel(file)}: skill reference '${ref}' does not exist`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`OK: ${skillIds.length} skills audited`);
