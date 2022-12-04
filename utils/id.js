import { v5 } from "uuid";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

// Seed besteht aus: WebsiteID + gekürzte IP-Adresse + Referrer + UserAgent +
// Hier kommt dazu: Gültigkeitsjahr + aktuelle Kalenderwoche + 10 Zeichen des Secrets
export function generateUUID(seed) {
  dayjs.extend(weekOfYear);
  const secret = process.env.NEXTAUTH_SECRET?.slice(0, 10);
  const date = dayjs().year().toString() + dayjs(new Date()).week().toString();

  return v5(seed.concat(date).concat(secret), v5.DNS);
}
