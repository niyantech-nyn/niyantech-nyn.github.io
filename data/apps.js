/**
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

const NIYAN_APPS = [

  {
    id:          "status-saver",
    name:        "Status Saver",
    icon:        "assets/images/status-saver.png",
    description: "Status Saver lets you view and save WhatsApp and WhatsApp Business status photos and videos, with direct chat without saving contacts.",
    playUrl:     "https://play.google.com/store/apps/details?id=com.niyantech.statussaver",
    privacyUrl:  "https://niyantech-nyn.github.io/statussaver-privacy-policy/privacy-policy.html",
    glowColor:   "green",
    status:      "published",
  },

  {
    id:          "tenant-manager",
    name:        "Tenant Manager",
    icon:        "assets/images/tenant-manager.png",
    description: "",
    playUrl:     "",
    privacyUrl:  "privacy-tenant-manager.html",
    glowColor:   "blue",
    status:      "published",
  }

];
