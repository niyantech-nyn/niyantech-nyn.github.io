# Niyan Tech — App Manager

A local admin tool for managing apps on the Niyan Tech developer website.
Runs on your computer only. The public GitHub Pages site is not affected while this is stopped.

---

## Quick Start

### Option A — Double-click (easiest)
1. Open the `admin/` folder in File Explorer
2. Double-click **`start.bat`**
3. Open your browser at **http://localhost:3000/admin**

### Option B — Terminal
```bash
cd admin
npm install     # first time only
npm start
# → http://localhost:3000/admin
```

Press **Ctrl+C** to stop the server.

---

## What it does

| Action | Result |
|--------|--------|
| Add/Edit/Delete an app | Updates `data/apps.js` |
| Upload an icon | Saves to `assets/images/` |
| Click Save & Commit | Runs `git add . && git commit` |
| You run `git push` | Live site on GitHub Pages updates |

---

## Requirements

- **Node.js** installed → check with `node -v` → download at https://nodejs.org
- **Git** initialized in the project root (`git init`)

---

## Adding a new app (under 1 minute)

1. Double-click `start.bat`
2. Click **Add New App**
3. Enter the name, upload the icon, paste the description and Play Store URL
4. Click **Save & Commit**
5. Open a terminal and run `git push`

---

## Files

```
admin/
├── server.js      Express server (reads/writes project files)
├── index.html     Admin UI
├── package.json   Node dependencies
├── start.bat      Windows launcher
├── .gitignore     Excludes node_modules/
└── README.md      This file
```

---

> ⚠ This tool is for local use only.
> Never deploy the `admin/` folder to GitHub Pages — it contains a Node.js server that won't run there.
> GitHub Pages only serves the static website files in the project root.
