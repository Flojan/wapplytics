import { DateTime } from "luxon";
import { v5 } from "uuid";

// Seed besteht aus: WebsiteID + gekürzte IP-Adresse + Referrer + UserAgent +
// Hier kommt dazu: Gültigkeitsjahr + aktuelle Kalenderwoche + 10 Zeichen des Secrets
export function generateUUID(seed) {
  const secret = process.env.NEXTAUTH_SECRET?.slice(0, 10);
  const date = DateTime.now().year.toString() + DateTime.now().weekNumber.toString();
  console.log("🚀 ~ file: id.js:9 ~ generateUUID ~ date", date);

  return v5(seed.concat(date).concat(secret), v5.DNS);
}
