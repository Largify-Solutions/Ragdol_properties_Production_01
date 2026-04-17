import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const ROOT = 'app/(website)';
const EXTS = new Set(['.tsx', '.jsx']);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (EXTS.has(path.extname(ent.name))) out.push(p);
  }
  return out;
}

function isInsideRegion(text, index, openTagRegex, closeTagRegex) {
  const before = text.slice(0, index);
  const opens = [...before.matchAll(openTagRegex)].length;
  const closes = [...before.matchAll(closeTagRegex)].length;
  return opens > closes;
}

function analyzeText(file, text) {
  const buttonRe = /<button\b([\s\S]*?)>/g;
  let m;
  let totalButtons = 0;
  const findings = [];

  while ((m = buttonRe.exec(text))) {
    totalButtons++;
    const attrs = m[1] ?? '';
    const idx = m.index;
    const line = text.slice(0, idx).split('\n').length;

    const hasOnClick = /\bonClick\s*=/.test(attrs);
    const hasDisabled = /\bdisabled\b/.test(attrs);
    const explicitType = (attrs.match(/\btype\s*=\s*['\"]([^'\"]+)['\"]/i) || [])[1]?.toLowerCase() ?? null;
    const isSubmitOrReset = explicitType === 'submit' || explicitType === 'reset';

    const insideForm = isInsideRegion(text, idx, /<form\b/gi, /<\/form>/gi);
    const insideLink = isInsideRegion(text, idx, /<Link\b/gi, /<\/Link>/gi);
    const hasMouseOnly = /\bonMouseEnter\s*=|\bonMouseLeave\s*=|\bonMouseOver\s*=/.test(attrs);

    const passive = !hasOnClick && !hasDisabled && !isSubmitOrReset;
    if (!passive) continue;

    let classification = 'actionable';
    let reason = 'No onClick/type handler detected';

    if (insideForm && explicitType === null) {
      classification = 'intentional';
      reason = 'Implicit submit button inside form';
    } else if (insideLink) {
      classification = 'intentional';
      reason = 'Wrapped by Link and navigates via parent';
    } else if (hasMouseOnly) {
      classification = 'actionable';
      reason = 'Hover-only behavior without click action';
    }

    const snippet = (`<button${attrs}>`).replace(/\s+/g, ' ').trim().slice(0, 180);
    findings.push({ file, line, classification, reason, snippet });
  }

  return { totalButtons, findings };
}

function getHeadText(file) {
  try {
    return execFileSync('git', ['show', `HEAD:${file}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null;
  }
}

const files = walk(ROOT);

const current = { totalButtons: 0, actionable: [], intentional: [] };
const head = { totalButtons: 0, actionable: [], intentional: [] };

for (const file of files) {
  const curText = fs.readFileSync(file, 'utf8');
  const cur = analyzeText(file, curText);
  current.totalButtons += cur.totalButtons;
  for (const f of cur.findings) {
    if (f.classification === 'actionable') current.actionable.push(f);
    else current.intentional.push(f);
  }

  const headText = getHeadText(file);
  if (headText != null) {
    const h = analyzeText(file, headText);
    head.totalButtons += h.totalButtons;
    for (const f of h.findings) {
      if (f.classification === 'actionable') head.actionable.push(f);
      else head.intentional.push(f);
    }
  }
}

console.log('=== FULL WEBSITE PASSIVE BUTTON AUDIT ===');
console.log(`Scope: ${ROOT}`);
console.log('--- BEFORE (git HEAD) ---');
console.log(`Total buttons: ${head.totalButtons}`);
console.log(`Actionable passive: ${head.actionable.length}`);
console.log(`Intentional passive: ${head.intentional.length}`);
console.log('--- AFTER (working tree) ---');
console.log(`Total buttons: ${current.totalButtons}`);
console.log(`Actionable passive: ${current.actionable.length}`);
console.log(`Intentional passive: ${current.intentional.length}`);
console.log('--- DELTA ---');
console.log(`Actionable passive reduced by: ${head.actionable.length - current.actionable.length}`);

console.log('\n=== CURRENT ACTIONABLE REMAINING (if any) ===');
if (current.actionable.length === 0) {
  console.log('None');
} else {
  for (const f of current.actionable.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)) {
    console.log(`${f.file}:${f.line} | ${f.reason} | ${f.snippet}`);
  }
}

console.log('\n=== CURRENT INTENTIONAL PASSIVE (sample up to 25) ===');
for (const f of current.intentional.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line).slice(0, 25)) {
  console.log(`${f.file}:${f.line} | ${f.reason} | ${f.snippet}`);
}
