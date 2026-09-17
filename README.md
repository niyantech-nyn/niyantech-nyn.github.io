# Niyan Tech Developer Website

Official developer website for **Niyan Tech** — Independent Android app developer.

🌐 **Live Site:** [https://niyantech-nyn.github.io](https://niyantech-nyn.github.io)

---

## About

This is a static website built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no backend. It is designed for direct deployment via **GitHub Pages** as a user site.

## Apps Featured

| App | Description |
|-----|-------------|
| **Status Saver** | Save WhatsApp statuses to your gallery |
| **LottoPick** | Random lottery number generator |
| **Tenant Manager** | Property and tenant management tool |

## Project Structure

```
/
├── index.html          # Main homepage
├── app-ads.txt         # AdMob app-ads.txt for verification
├── icon.png            # Niyan Tech logo
├── .nojekyll           # GitHub Pages: bypass Jekyll
├── assets/
│   ├── css/
│   │   └── style.css   # Main stylesheet
│   ├── js/
│   │   └── main.js     # Vanilla JS (nav, scroll, animations)
│   └── images/         # App icons
└── data/
    └── apps.js         # App configuration (managed by App Manager)
```

> **Note:** The `admin/` folder is a local-only tool. It is excluded from Git and never deployed.

## Deploying to GitHub Pages

This is a **user site** (`<username>.github.io`). GitHub Pages automatically serves `index.html` from the `main` branch root — no configuration needed.

1. Push to `main`.
2. GitHub Pages serves the site at `https://niyantech-nyn.github.io/`.

### AdMob app-ads.txt verification

The `app-ads.txt` file at the repository root is publicly accessible at:

```
https://niyantech-nyn.github.io/app-ads.txt
```

Enter this URL in your Google Play Developer Console as your developer website to enable AdMob verification.

## Local App Manager

The `admin/` folder contains a local Node.js admin tool for managing app data.
It is **not deployed** — it is for local use only.

```
cd admin
npm install      # first time only
npm start        # starts at http://localhost:3000/admin
```

Or double-click `start-admin.bat` from the project root.

## Contact

- 📧 niyantech.in@gmail.com

---

© 2026 Niyan Tech. All rights reserved.
