/* ============================================================
   WealthLink Media – RankFlow landing site config
   Everything you will likely need to change lives in this file.
   ============================================================ */
window.SITE_CONFIG = {
  /* ---- Opt-in survey ---------------------------------------
     TODO: paste the GoHighLevel inbound-webhook URL here.
     Left empty on purpose. Do not invent a URL.
     While this is empty ("") the survey skips the POST and still
     redirects to NEXT_PAGE after a valid step 5.
     LEAD_WEBHOOK_URL is only used if RANKFLOW_WEBHOOK_URL is blank
     and that older constant has been filled in.                 */
  RANKFLOW_WEBHOOK_URL: "",
  LEAD_WEBHOOK_URL: "",
  LEAD_SOURCE: "rankflow-optin",
  NEXT_PAGE: "main.html",              // where the survey sends people after submit

  /* ---- Secondary page buttons ------------------------------- */
  RANKFLOW_URL: "https://app.rankflowseo.ai/",  // "Get RankFlow Access" – opens in a new tab
  DEMO_URL: "support.html",            // "Book a RankFlow Demo"
  SUPPORT_URL: "support.html",         // "Need help with RankFlow?" button

  /* ---- Tracking placeholders (blank = off) ------------------ */
  META_PIXEL_ID: "",
  GA_MEASUREMENT_ID: "",               // e.g. G-XXXXXXXXXX
  GTM_ID: "",                          // e.g. GTM-XXXXXXX
  TIKTOK_PIXEL_ID: "",

  /* ---- Contact (privacy / terms / help button) -------------- */
  CONTACT_EMAIL: "support@wealthlinkmedia.com",

  /* ---- Video reviews (index + main) -------------------------
     Left card is the original review. Right card is review 3.   */
  REVIEW_VIDEOS: [
    { name: "Client review 1", src: "assets/videos/review-1.mp4", poster: "assets/videos/review-1.jpg" },
    { name: "Client review 3", src: "assets/videos/review3.mp4", poster: "assets/review3-poster.jpg" }
  ]
};
