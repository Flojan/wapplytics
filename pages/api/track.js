import NextCors from "nextjs-cors";
import {
  anonymizeIP,
  createSession,
  createView,
  generateUUID,
  getRequestIP,
  getWebsiteByNanoID,
  sessionExists,
  websiteValidationCheck,
} from "../../services/VerifyData";

export default async function handler(req, res) {
  // CORS aktivieren
  await NextCors(req, res, {
    origin: true,
  });
  const data = req.body;
  data.dbwebsite = await getWebsiteByNanoID(data.identifier);
  if (!(await websiteValidationCheck(data.dbwebsite, data.website))) return console.log("Invalid website"); // Website ist nicht valid, bricht also ab

  // da aktuell nur der Localhost zurückgegeben wird, wird eine Bespiel IP-Adresse des Clients manuell gesetzt
  const clientIP = getRequestIP(req);
  const clientIPv4 = "185.209.196.17";
  const clientIPv6 = "2a03:1b20:6:f011::a02e";

  data.anonymizedIP = anonymizeIP(clientIPv4);
  data.sessionUUID = generateUUID(data.dbwebsite.website_id + data.anonymizedIP + data.referrer + data.userAgent);
  data.session = await sessionExists(data.sessionUUID);
  data.session ? await createView(data) : await createSession(data);

  res.status(200).json({ data: req.body });
}
