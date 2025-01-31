export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const API_URL = IS_PRODUCTION
  ? "https://test-server-tau-two.vercel.app"
  : "http://localhost:8000";

export const TABLE_URL =
  "https://emma.maryland.gov/page.aspx/en/rfp/request_browse_public";

export const ITEM_URL =
  "https://emma.maryland.gov/page.aspx/en/bpm/process_manage_extranet";

export const selectors = {
  SUMMARY: "#body_x_tabc_rfp_ext_prxrfp_ext_x_lblSummary",
  ATTACHMENTS: "#body_x_tabc_rfp_ext_prxrfp_ext_x_prxDoc_x_grid_grd",
};
