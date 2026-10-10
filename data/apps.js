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

var NIYAN_APPS = [

  {
    id:          "status-saver",
    name:        "Status Saver",
    icon:        "assets/images/status-saver.png",
    description: "",
    playUrl:     "",
    privacyUrl:  "privacy-status-saver.html",
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
  },

  {
    id:          "lottopick",
    name:        "LottoPick",
    icon:        "assets/images/lottopick-1791615274737.png",
    description: "LottoPick is a lottery analysis app that provides historical draw results, number frequency and gap analysis, simulations, wheeling, expected value calculations, and number-picking tools to help users explore lottery statistics and patterns.",
    playUrl:     "https://play.google.com/store/apps/details?id=com.niyantech.lottopick",
    privacyUrl:  "https://niyantech-nyn.github.io/lottoPick-privacy-policy/privacy-policy.html",
    glowColor:   "blue",
    status:      "published",
  }

];
