import { getToken } from "next-auth/jwt";
import { getAllWebsiteData } from "../../../services/WebsiteData";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (token) {
    const data = await getAllWebsiteData();

    return res.status(200).json({ data: data });
  }
}
