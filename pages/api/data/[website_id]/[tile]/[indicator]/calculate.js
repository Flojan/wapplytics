import { getBigChartData, getCompactData, getMultiData, getSmallTextData } from "../../../../../../services/DeployData";

export default async function handler(req, res) {
  const { website_id, tile, indicator } = req.query;

  if (tile === "multidata") {
    const data = await getMultiData(website_id, indicator);
    res.status(200).json({ data: data });
  } else if (tile === "compact") {
    const data = await getCompactData(website_id, indicator);
    res.status(200).json({ data: data });
  } else if (tile === "bigchart") {
    const data = await getBigChartData(website_id, indicator);
    res.status(200).json({ data: data });
  } else if (tile === "smalltext") {
    const data = await getSmallTextData(website_id, indicator);
    res.status(200).json({ data: data });
  } else if (tile === "smallchart") {
    // const data = await getCompactData(website_id, indicator);
    // res.status(200).json({ data: data });
  } else if (tile === "goalpogress") {
    // const data = await getCompactData(website_id, indicator);
    // res.status(200).json({ data: data });
  } else {
    res.status(200).json({ data: "no valid tile" });
  }
}