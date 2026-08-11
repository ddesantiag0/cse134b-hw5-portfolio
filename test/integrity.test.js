const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');

test('page-level local assets resolve', () => {
  for (const file of fs.readdirSync(root).filter((name) => name.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const refs = [...html.matchAll(/(?:src|href)=["']([^"'#?]+)["']/g)].map((match) => match[1]);
    for (const ref of refs.filter((value) => !/^(?:https?:|javascript:|mailto:|tel:|\$\{)/.test(value))) {
      assert.ok(fs.existsSync(path.join(root, ref)), `${file} references missing ${ref}`);
    }
  }
});

test('project card assigns untrusted values as text', () => {
  const script = fs.readFileSync(path.join(root, 'assets/js/project-card.js'), 'utf8');
  assert.match(script, /textContent/);
  assert.doesNotMatch(script, /innerHTML/);
});
