/**
 * ─────────────────────────────────────────────────────────────
 *  Niyan Tech – App Data Configuration
 *  data/apps.js
 * ─────────────────────────────────────────────────────────────
 *
 *  HOW TO ADD A NEW APP
 *  ─────────────────────
 *  1. Copy the empty template at the bottom of this file.
 *  2. Fill in each field manually (see field guide below).
 *  3. Put the app icon in  assets/images/  and set the path in `icon`.
 *  4. Write the description yourself in `description`.
 *  5. Paste the real Google Play URL into `playUrl`
 *     (leave it as '' until the app is live on Play Store).
 *  6. Create the privacy-policy HTML file and set its path in `privacyUrl`
 *     (leave it as '' if you do not have a policy yet).
 *  7. Change `status` to 'published' once the app is live.
 *
 *  FIELD GUIDE
 *  ───────────
 *  id          Unique slug. Used for element IDs and anchor links.
 *              Use lowercase letters and hyphens only.
 *              Example: 'my-app-name'
 *
 *  name        Display name shown on the app card.
 *              Example: 'My App Name'
 *
 *  icon        Path to the app icon, relative to the website root.
 *              Example: 'assets/images/my-app-name.jpg'
 *
 *  description A short, accurate description of what the app does.
 *              Write this yourself — do not invent or assume.
 *              Example: 'A simple tool that helps you do X.'
 *
 *  playUrl     Full Google Play Store URL for this app.
 *              Leave as '' until the app is published on Play Store.
 *              Example: 'https://play.google.com/store/apps/details?id=com.niyantech.myapp'
 *
 *  privacyUrl  Path to the privacy policy HTML file for this app.
 *              Leave as '' if you do not have a privacy policy yet.
 *              Example: 'privacy-my-app-name.html'
 *
 *  glowColor   Accent colour for the card hover glow.
 *              Options: 'green' | 'blue' | 'purple' | 'orange' | 'teal' | 'red'
 *
 *  status      'published'   – App is live; shown normally with Play button.
 *              'coming-soon' – App not yet live; shown with "Coming Soon" badge,
 *                             Play button is hidden.
 * ─────────────────────────────────────────────────────────────
 */

const NIYAN_APPS = [

  /* ── Status Saver ── */
  {
    id:          'status-saver',
    name:        'Status Saver',
    icon:        'assets/images/status-saver.png',
    description: '',   // ← Fill in: describe what Status Saver does
    playUrl:     '',   // ← Fill in: actual Google Play URL
    privacyUrl:  'privacy-status-saver.html',
    glowColor:   'green',
    status:      'published',
  },

  /* ── LottoPick ── */
  {
    id:          'lottopick',
    name:        'LottoPick',
    icon:        'assets/images/lottopick.png',
    description: '',   // ← Fill in: describe what LottoPick does
    playUrl:     '',   // ← Fill in: actual Google Play URL
    privacyUrl:  'privacy-lottopick.html',
    glowColor:   'purple',
    status:      'published',
  },

  /* ── Tenant Manager ── */
  {
    id:          'tenant-manager',
    name:        'Tenant Manager',
    icon:        'assets/images/tenant-manager.png',
    description: '',   // ← Fill in: describe what Tenant Manager does
    playUrl:     '',   // ← Fill in: actual Google Play URL
    privacyUrl:  'privacy-tenant-manager.html',
    glowColor:   'blue',
    status:      'published',
  },


  /* ════════════════════════════════════════════════════════
     ADD NEW APPS BELOW — copy the template and fill it in
     ════════════════════════════════════════════════════════

  {
    id:          '',          // unique slug, e.g. 'my-new-app'
    name:        '',          // display name, e.g. 'My New App'
    icon:        '',          // e.g. 'assets/images/my-new-app.jpg'
    description: '',          // write the description yourself
    playUrl:     '',          // paste Play Store URL when live
    privacyUrl:  '',          // e.g. 'privacy-my-new-app.html'
    glowColor:   'blue',      // green | blue | purple | orange | teal | red
    status:      'published', // 'published' or 'coming-soon'
  },

     ════════════════════════════════════════════════════════ */

];
