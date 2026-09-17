'use strict';

/**
 * ─────────────────────────────────────────────────────────────
 *  Niyan Tech – Local App Manager Server
 *  admin/server.js
 *
 *  Run from the admin/ folder:
 *    npm install   (first time only)
 *    npm start
 *
 *  Then open: http://localhost:3000/admin
 * ─────────────────────────────────────────────────────────────
 */

const express    = require('express');
const multer     = require('multer');
const path       = require('path');
const fs         = require('fs');
const { exec }   = require('child_process');
const vm         = require('vm');

const app  = express();
const PORT = 3000;

/* ── Paths ── */
const PROJECT_ROOT = path.join(__dirname, '..');
const APPS_JS_PATH = path.join(PROJECT_ROOT, 'data', 'apps.js');
const IMAGES_DIR   = path.join(PROJECT_ROOT, 'assets', 'images');

/* ── Ensure images directory exists ── */
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

/* ── Multer — icon uploads go directly into assets/images/ ── */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, IMAGES_DIR),
  filename: (_req, file, cb) => {
    /* Sanitise filename: lowercase, replace spaces/special chars with hyphens */
    const ext  = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9\-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    /* Timestamp suffix avoids caching stale icons */
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error('Only image files are allowed (jpg, png, webp, gif)'));
    }
    cb(null, true);
  },
});

/* ── Middleware ── */
app.use(express.json({ limit: '2mb' }));

/* Serve project assets for icon preview in the admin UI */
app.use('/preview', express.static(PROJECT_ROOT));

/* Serve the admin UI */
app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/* ═══════════════════════════════════════════════════════════
   API: GET /api/apps
   Returns the current NIYAN_APPS array as JSON
   ═══════════════════════════════════════════════════════════ */
app.get('/api/apps', (_req, res) => {
  try {
    res.json({ success: true, apps: readApps() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ═══════════════════════════════════════════════════════════
   API: POST /api/apps
   Body: { apps: [...] }
   Overwrites data/apps.js with the new array
   ═══════════════════════════════════════════════════════════ */
app.post('/api/apps', (req, res) => {
  try {
    const { apps } = req.body;
    if (!Array.isArray(apps)) throw new Error('apps must be an array');
    writeApps(apps);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ═══════════════════════════════════════════════════════════
   API: POST /api/upload-icon
   Multipart: field name = "icon"
   Saves file to assets/images/, returns the web-root path
   ═══════════════════════════════════════════════════════════ */
app.post('/api/upload-icon', (req, res) => {
  upload.single('icon')(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded.' });
    res.json({
      success:  true,
      filename: req.file.filename,
      path:     `assets/images/${req.file.filename}`,
    });
  });
});

/* ═══════════════════════════════════════════════════════════
   API: POST /api/git-commit
   Body: { message?: string }
   Runs: git add . && git commit -m "<message>"
   in the project root. Does NOT push.
   ═══════════════════════════════════════════════════════════ */
app.post('/api/git-commit', (req, res) => {
  const rawMsg = req.body && req.body.message
    ? req.body.message
    : 'Update app data via App Manager';
  /* Escape double-quotes for shell safety */
  const msg = rawMsg.replace(/"/g, "'");

  exec(
    `git add . && git commit -m "${msg}"`,
    { cwd: PROJECT_ROOT, shell: true },
    (err, stdout, stderr) => {
      const out = (stdout + stderr).trim();
      /* "nothing to commit" is not an error */
      if (err && !out.toLowerCase().includes('nothing to commit')) {
        return res.json({ success: false, output: out || err.message });
      }
      res.json({ success: true, output: out || 'Nothing new to commit.' });
    }
  );
});

/* ═══════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════ */

/** Read NIYAN_APPS from data/apps.js using Node vm (safe eval).
 *  Replaces `const` / `let` with `var` so the sandbox can see the variable. */
function readApps() {
  let code = fs.readFileSync(APPS_JS_PATH, 'utf8');

  /* Normalise: convert const/let declarations to var so vm sandbox exposes them */
  code = code.replace(/^\s*const\s+/gm, 'var ').replace(/^\s*let\s+/gm, 'var ');

  try {
    /* Strategy 1: expression at end returns the value directly */
    const result = vm.runInNewContext(code + '\n;NIYAN_APPS;', Object.create(null));
    if (Array.isArray(result)) return result;
  } catch (_) { /* fall through */ }

  try {
    /* Strategy 2: read from sandbox context (works with var) */
    const ctx = Object.create(null);
    vm.runInNewContext(code, ctx);
    if (Array.isArray(ctx.NIYAN_APPS)) return ctx.NIYAN_APPS;
  } catch (err) {
    console.error('Error reading apps.js:', err.message);
  }

  return [];
}


/** Write apps array back to data/apps.js, preserving the JS module format */
function writeApps(apps) {
  const entries = apps.map((a) => {
    return [
      '  {',
      `    id:          ${JSON.stringify(String(a.id || ''))},`,
      `    name:        ${JSON.stringify(String(a.name || ''))},`,
      `    icon:        ${JSON.stringify(String(a.icon || ''))},`,
      `    description: ${JSON.stringify(String(a.description || ''))},`,
      `    playUrl:     ${JSON.stringify(String(a.playUrl || ''))},`,
      `    privacyUrl:  ${JSON.stringify(String(a.privacyUrl || ''))},`,
      `    glowColor:   ${JSON.stringify(String(a.glowColor || 'blue'))},`,
      `    status:      ${JSON.stringify(String(a.status || 'published'))},`,
      '  }',
    ].join('\n');
  }).join(',\n\n');

  const content =
`/**
 * ─────────────────────────────────────────────────────────────
 *  Niyan Tech – App Data Configuration
 *  data/apps.js
 *
 *  ⚠  Managed by the App Manager. Do not edit by hand.
 *     To add or edit apps, run:
 *       cd admin && npm start
 *     Then open: http://localhost:3000/admin
 * ─────────────────────────────────────────────────────────────
 */

var NIYAN_APPS = [

${entries}

];
`;

  fs.writeFileSync(APPS_JS_PATH, content, 'utf8');
}

/* ── Start ── */
app.listen(PORT, () => {
  console.log('\n  ╔═══════════════════════════════════════╗');
  console.log('  ║   Niyan Tech — Local App Manager     ║');
  console.log('  ╚═══════════════════════════════════════╝');
  console.log(`\n  Open in your browser:`);
  console.log(`  →  http://localhost:${PORT}/admin\n`);
  console.log('  Press Ctrl+C to stop.\n');
});
