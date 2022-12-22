import { createWebsite } from "../../../services/WebsiteData";

export default async function handler(req, res) {
  console.log("HIER: ", req.body);
  const data = await createWebsite(req.body);

  return res.status(200).json({ data: data });
}
