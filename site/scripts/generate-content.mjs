// Reads every skill folder in this repository (a folder at the repo root that
// contains SKILL.md) and writes src/content/generated/skills.json for the site.
// No network access: everything comes from the checked-out repo.
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoDir = resolve(siteDir, '..');
const repoUrl = 'https://github.com/captains-chest/skills';
const sourceBranch = 'main';
const ignoredDirs = new Set(['site', 'docs', 'node_modules']);

const fail = (message) => {
  console.error(`content: ${message}`);
  process.exit(1);
};

const parseSkillFile = (text, file) => {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) fail(`${file} has no front matter`);
  const meta = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^([\w-]+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.replace(/^["']|["']$/g, '').trim()]),
  );
  if (!meta.name || !meta.description) fail(`${file} needs "name" and "description" in its front matter`);
  return { meta, body: match[2] };
};

// "Does X. Use when Y." -> purpose "Does X.", whenToUse "Use when Y."
const splitDescription = (description) => {
  const index = description.search(/(?:^|\.\s+)Use (?:when|for|this|it)\b/);
  if (index < 0) return { purpose: description, whenToUse: '' };
  const cut = description[index] === '.' ? index + 1 : index;
  return { purpose: description.slice(0, cut).trim(), whenToUse: description.slice(cut).trim() };
};

const firstHeading = (markdown, fallback) => markdown.match(/^#\s+(.+)$/m)?.[1].trim() ?? fallback;
const sectionHeadings = (markdown) => [...markdown.matchAll(/^##\s+(.+)$/gm)].map(([, heading]) => heading.trim());

const docOrder = (file) => (file === 'SKILL.md' ? 0 : file === 'README.md' ? 1 : 2);

const readSkill = (slug) => {
  const folder = join(repoDir, slug);
  const { meta, body } = parseSkillFile(readFileSync(join(folder, 'SKILL.md'), 'utf8'), `${slug}/SKILL.md`);
  if (meta.name !== slug) fail(`${slug}/SKILL.md: name "${meta.name}" must match its folder name`);
  const docs = readdirSync(folder)
    .filter((file) => file.endsWith('.md'))
    .sort((a, b) => docOrder(a) - docOrder(b) || a.localeCompare(b))
    .map((file) => {
      const markdown = file === 'SKILL.md' ? body : readFileSync(join(folder, file), 'utf8');
      return {
        file,
        title: file === 'SKILL.md' ? 'SKILL.md' : firstHeading(markdown, file),
        sections: sectionHeadings(markdown),
        html: marked.parse(markdown, { async: false }),
        sourceUrl: `${repoUrl}/blob/${sourceBranch}/${slug}/${file}`,
      };
    });
  const otherFiles = readdirSync(folder).filter((file) => !file.endsWith('.md'));
  return {
    slug,
    name: meta.name,
    description: meta.description,
    ...splitDescription(meta.description),
    install: `npx skills@latest add captains-chest/skills --skill ${slug} -y`,
    sourceUrl: `${repoUrl}/tree/${sourceBranch}/${slug}`,
    docs,
    otherFiles,
  };
};

const slugs = readdirSync(repoDir)
  .filter((name) => !name.startsWith('.') && !ignoredDirs.has(name))
  .filter((name) => statSync(join(repoDir, name)).isDirectory() && existsSync(join(repoDir, name, 'SKILL.md')))
  .sort();
if (slugs.length === 0) fail('no skill folders found');
const skills = slugs.map(readSkill);

// Every slug cited by the hand-written content must exist.
const known = new Set(slugs);
const tenets = JSON.parse(readFileSync(join(siteDir, 'src/content/tenets.json'), 'utf8'));
for (const tenet of tenets) {
  if (!tenet.sources?.length) fail(`tenet "${tenet.slug}" cites no skills`);
  for (const source of tenet.sources) {
    if (!known.has(source)) fail(`tenet "${tenet.slug}" cites unknown skill "${source}"`);
  }
}
const notes = JSON.parse(readFileSync(join(siteDir, 'src/content/skill-notes.json'), 'utf8'));
for (const slug of Object.keys(notes)) {
  if (!known.has(slug)) fail(`skill-notes.json has notes for unknown skill "${slug}"`);
}

const outDir = join(siteDir, 'src/content/generated');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'skills.json'), `${JSON.stringify(skills, null, 2)}\n`);
console.log(`content: ${skills.length} skills (${slugs.join(', ')}), ${tenets.length} tenets`);
