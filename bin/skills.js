#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function getSkillDirs() {
  return fs
    .readdirSync(root, {withFileTypes: true})
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => fs.existsSync(path.join(root, name, 'SKILL.md')))
    .sort();
}

function expandHome(inputPath) {
  if (!inputPath) return inputPath;
  if (inputPath === '~') return os.homedir();
  if (inputPath.startsWith('~/')) return path.join(os.homedir(), inputPath.slice(2));
  return inputPath;
}

function copyDir(srcDir, dstDir) {
  fs.mkdirSync(dstDir, {recursive: true});

  for (const entry of fs.readdirSync(srcDir, {withFileTypes: true})) {
    const src = path.join(srcDir, entry.name);
    const dst = path.join(dstDir, entry.name);

    if (entry.isDirectory()) {
      copyDir(src, dst);
    } else if (entry.isFile()) {
      fs.copyFileSync(src, dst);
    }
  }
}

function printHelp() {
  console.log(`skills

Usage:
  skills list
  skills install [targetDir]
  skills help

Examples:
  skills list
  skills install
  skills install ~/.pi/agent/skills
`);
}

const cmd = process.argv[2] ?? 'help';

if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
  printHelp();
  process.exit(0);
}

const skillDirs = getSkillDirs();

if (cmd === 'list') {
  if (skillDirs.length === 0) {
    console.log('No skills found in this package.');
  } else {
    console.log(skillDirs.join('\n'));
  }
  process.exit(0);
}

if (cmd === 'install') {
  const targetArg = process.argv[3] ?? '~/.pi/agent/skills';
  const targetDir = path.resolve(expandHome(targetArg));

  fs.mkdirSync(targetDir, {recursive: true});

  for (const skill of skillDirs) {
    const src = path.join(root, skill);
    const dst = path.join(targetDir, skill);
    copyDir(src, dst);
    console.log(`Installed ${skill} -> ${dst}`);
  }

  console.log(`Done. Installed ${skillDirs.length} skill(s) to ${targetDir}`);
  process.exit(0);
}

console.error(`Unknown command: ${cmd}`);
printHelp();
process.exit(1);
