# Niyan Tech Developer Website

Official developer website for **Niyan Tech** — Independent Android app developer.

🌐 **Live Site:** [https://niyantech.github.io](https://niyantech.github.io) *(update with your actual GitHub Pages URL)*

---

## About

This is a static website built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no backend. It is designed for direct deployment via **GitHub Pages**.

## Apps Featured

| App | Description |
|-----|-------------|
| **Status Saver** | Save WhatsApp statuses to your gallery |
| **LottoPick** | Random lottery number generator |
| **Tenant Manager** | Property and tenant management tool |

## Project Structure

```
/
├── index.html                     # Main homepage
├── privacy-status-saver.html      # Privacy policy – Status Saver
├── privacy-lottopick.html         # Privacy policy – LottoPick
├── privacy-tenant-manager.html    # Privacy policy – Tenant Manager
├── app-ads.txt                    # AdMob app-ads.txt for verification
├── icon.png                       # Niyan Tech logo
├── .nojekyll                      # GitHub Pages: bypass Jekyll
└── assets/
    ├── css/
    │   └── style.css              # Main stylesheet
    ├── js/
    │   └── main.js                # Vanilla JS (nav, scroll, animations)
    └── images/
        ├── status-saver.jpg
        ├── lottopick.jpg
        └── tenant-manager.jpg
```

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Select `main` branch, root (`/`) directory.
5. Click **Save**.
6. Your site will be live at `https://<username>.github.io/<repo-name>/`

### For AdMob app-ads.txt verification

The `app-ads.txt` file at the root will be accessible at:

```
https://<your-github-pages-domain>/app-ads.txt
```

Enter this URL in your Google Play Developer Console as your developer website to enable AdMob verification.

## Contact

- 📧 niyantech.in@gmail.com

---

&copy; 2026 Niyan Tech. All rights reserved.
