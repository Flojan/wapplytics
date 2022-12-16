import { getAllWebsiteData } from "../../../services/WebsiteData";

export default async function handler(req, res) {
  const data = await getAllWebsiteData();

  return res.status(200).json({ data: data });
}
