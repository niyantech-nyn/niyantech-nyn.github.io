# CLAUDE.md — Niyan Tech Developer Website

## Overview
Official developer website for **Niyan Tech** (Independent Android app developer).
- **Live Site:** https://niyantech-nyn.github.io/
- **Hosting / Deployment:** GitHub Pages (User site: `niyantech-nyn.github.io`, serves directly from root of `main` branch).
- **Tech Stack:** Vanilla HTML5, CSS3, JavaScript (no frontend frameworks or build steps).
- **AdMob app-ads.txt:** Located at root (`app-ads.txt`), publicly accessible at `https://niyantech-nyn.github.io/app-ads.txt`.

---

## Featured Apps
Configured in `data/apps.js` (`NIYAN_APPS`):
1. **Status Saver** — `com.niyantech.statussaver` (Icon: `assets/images/status-saver.png`)
2. **Tenant Manager** — `com.niyantech.tenantmanager` (Icon: `assets/images/tenant-manager.png`)
3. **LottoPick** — `com.niyantech.lottopick` (Icon: `assets/images/lottopick.png`)
4. **Color Fun** — `com.niyantech.coloring` (Icon: `assets/images/ColorFun.png`)
5. **Word Scramble** — `com.niyantech.wordscramble` (Icon: `assets/images/WordScramble.png`)

---

## Directory Structure
```
/
├── index.html              # Main landing page (hero, apps showcase, about, contact)
├── app-ads.txt             # Google AdMob verification file
├── icon.png                # Developer logo / favicon
├── .nojekyll               # Disables Jekyll processing on GitHub Pages
├── .gitignore              # Ignores admin/ and OS/editor temp files
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet (dark theme, responsive flex/grid, card alignment)
│   ├── js/
│   │   └── main.js         # Renders cards dynamically from data/apps.js, UI animations
│   └── images/             # Clean app icons (e.g. ColorFun.png, WordScramble.png)
├── data/
│   └── apps.js             # NIYAN_APPS configuration array
├── admin/                  # LOCAL ONLY: Express admin dashboard (never deployed)
│   ├── server.js           # API: /api/apps, /api/images, /api/upload-icon, /api/git-commit
│   ├── index.html          # Admin UI with icon picker, app editor, commit button
│   └── package.json        # Express, Multer dependencies
├── start-admin.bat         # Launcher for local admin tool
└── README.md               # Repository documentation
```

---

## Local App Manager (`admin/`)
A local Node.js tool used to manage `data/apps.js` and upload icons.

### Starting the Admin Panel:
- **Batch file:** Double-click `start-admin.bat` from the root, or
- **Terminal:**
  ```bash
  cd admin
  npm install    # first time only
  npm start      # starts server at http://localhost:3000/admin
  ```

### Key Admin Features:
- **Existing Icon Selector:** Dropdown automatically scans `assets/images/` via `/api/images` so you can choose any icon already placed in the folder.
- **Manual Icon Path:** Editable text input to set or adjust paths directly (e.g., `assets/images/WordScramble.png`).
- **Clean Icon Uploads:** Uploading or dragging images preserves original clean filenames without duplicate timestamp suffixes.
- **Save & Commit:** Writes directly to `data/apps.js` and creates a local git commit.

---

## Deployment & Cache Notes
1. **Deploy to GitHub Pages:**
   ```bash
   git add .
   git commit -m "Update apps or content"
   git push origin main
   ```
2. **Browser Cache Busting:**
   - GitHub Pages serves static files with cache headers. If updates to `data/apps.js` or `style.css` do not immediately reflect on the live website, use a hard refresh (**`Ctrl + Shift + R`**) or check in an Incognito window.

---

## Important Rules
- Never deploy the `admin/` folder (it is listed in `.gitignore`).
- Keep app icon filenames clean and human-readable inside `assets/images/` (e.g. `WordScramble.png`, not timestamped duplicates).
- Always verify that each app entry in `data/apps.js` includes valid `description`, `playUrl`, and `privacyUrl` fields before committing.
