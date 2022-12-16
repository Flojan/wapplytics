import { DateTime } from "luxon";
import { nanoid } from "nanoid";
import { v5 } from "uuid";

// Seed besteht aus: WebsiteID + gekürzte IP-Adresse + Referrer + UserAgent +
// Hier kommt dazu: Gültigkeitsjahr + aktuelle Kalenderwoche + 10 Zeichen des Secrets
export function generateUUID(seed) {
  const secret = process.env.NEXTAUTH_SECRET?.slice(0, 10);
  const date = DateTime.now().year.toString() + DateTime.now().weekNumber.toString();

  return v5(seed.concat(date).concat(secret), v5.DNS);
}

export function generateNanoID() {
  return nanoid(10);
}
