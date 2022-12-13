import { getViews } from "../../../../../services/DeployData";

export default async function handler(req, res) {
  const { website_id, tile } = req.query;
  console.log("🚀 ~ file: views.js:5 ~ handler ~ req.query", req);
  const views = await getViews(website_id, tile);
  console.log("🚀 ~ file: views.js:6 ~ handler ~ views", views);
  res.status(200).json({ data: views });
}
