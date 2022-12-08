import cors from "cors";
import NextCors from "nextjs-cors";
import { getWebsiteByNanoID, websiteValidationCheck } from "../../services/VerifyData";

export default async function handler(req, res) {
  await NextCors(req, res, {
    origin: true,
  });
  res.status(200).json({ data: req.body });
  const data = req.body;
  console.log("DATA:", data);
  console.log(await websiteValidationCheck(data.identifier, data.website));
}

// const getWebsiteOrigin = async (data) => {
//   console.log("DATA:", data.identifier);
//   return await getWebsiteByNanoID(data);
// };

// export default async function handler(req, res) {
//   const corsOptions = { origin: true, optionsSuccessStatus: 200 };
//   cors(corsOptions)(req, res, () => {
//     res.status(200).json({ data: req.body });
//   });
//   const data = req.body;

//   const website = await getWebsiteOrigin(data);
//   console.log("WEBSITE:", website?.website_url);
// }

// const test = {
//   data: {
//     userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
//     os: "MacIntel",
//     screen: "2560x1440",
//     language: "en-GB",
//     referrer: "https://rollendepizzeria.local:8890/administrator/index.php?option=com_cache",
//     website: "rollendepizzeria.local",
//     path: "/",
//     identifier: "iXgU8_PsfF",
//   },
// };
