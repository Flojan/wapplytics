import { getToken } from "next-auth/jwt";
import { getCompactData, getLiveData, getMultiData, getNameValueData } from "../../../../../../../services/DeployData";

export default async function handler(req, res) {
  const token = await getToken({ req });

  if (token) {
    const { website_id, user_id, tile, indicator } = req.query;

    if (tile === "multidata") {
      const data = await getMultiData(website_id, user_id, indicator);
      res.status(200).json({ data: data });
    } else if (tile === "compact") {
      const data = await getCompactData(website_id, user_id, indicator);
      res.status(200).json({ data: data });
    } else if (tile === "bigchart") {
      const data = await getNameValueData(website_id, user_id, indicator);
      res.status(200).json({ data: data });
    } else if (tile === "smalltext") {
      const data = await getNameValueData(website_id, user_id, indicator);
      res.status(200).json({ data: data });
    } else if (tile === "livedata") {
      const data = await getLiveData(website_id, user_id, indicator);
      res.status(200).json({ data: data });
    } else if (tile === "smallchart") {
      const data = await getNameValueData(website_id, user_id, indicator);
      res.status(200).json({ data: data });
    } else {
      res.status(200).json({ data: "invalid response" });
    }
  } else {
    res.status(401);
  }
}
