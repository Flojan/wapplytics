import { getToken } from "next-auth/jwt";
import { createWebsite } from "../../../services/WebsiteData";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (token) {
    const data = await createWebsite(req.body);

    return res.status(200).json({ data: data });
  } else {
    res.status(401);
  }
}
