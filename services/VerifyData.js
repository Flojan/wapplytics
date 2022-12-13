import client from "../utils/prismadb";
import requestIp from "request-ip";
import { v5 } from "uuid";
import maxmind from "maxmind";
import { DateTime } from "luxon";

export const getWebsiteByNanoID = async (identifier) => {
  return await client.website
    .findUnique({
      where: {
        website_nanoid: identifier,
      },
      select: {
        website_id: true,
        website_url: true,
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};

export const websiteValidationCheck = async (dbHost, reqHost) => {
  if (!dbHost || !reqHost) return false;
  dbHost = dbHost.website_url.split("://")[1];
  return dbHost === reqHost ? true : false;
};

export const getRequestIP = (req) => {
  return requestIp.getClientIp(req) === "127.0.0.1" || "::1" || "::ffff:127.0.0.1" ? "127.0.0.1" : requestIp.getClientIp(req);
};

// Seed besteht aus: WebsiteID + gekürzte IP-Adresse + Referrer + UserAgent +
// Hier kommt dazu: Gültigkeitsjahr + aktuelle Kalenderwoche + 10 Zeichen des Secrets
export function generateUUID(seed) {
  const secret = process.env.NEXTAUTH_SECRET?.slice(0, 10);
  const date = DateTime.now().year.toString() + DateTime.now().weekNumber.toString();
  return v5(seed.concat(date).concat(secret), v5.DNS);
}

export const anonymizeIP = (ip) => {
  if (ip === "127.0.0.1") return ip;
  if (ip.includes(".")) return ip.split(".").slice(0, 3).join(".") + ".0";
  if (ip.includes(":")) {
    const ipv6 = ip.split(":");
    ipv6.pop();
    return ipv6.join(":") + ":0";
  }
};

export const sessionExists = async (uuid) => {
  return await client.session
    .findUnique({
      where: {
        session_uuid: uuid,
      },
      select: {
        session_id: true,
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};

export const createView = async (data, session_id = null) => {
  return await client.view
    .create({
      data: {
        session_id: session_id ? session_id : data.session.session_id,
        website_id: data.dbwebsite.website_id,
        path: data.path,
        referrer: data.referrer,
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};

export const createSession = async (data) => {
  const session = await client.session
    .create({
      data: {
        session_uuid: data.sessionUUID,
        website_id: data.dbwebsite.website_id,
        website_url: data.website,
        language: data.language,
        country: await getCountryByIP(data.anonymizedIP),
        browser: getBrowserByUA(data.userAgent),
        os: data.os,
        device: getDevice(data.userAgent, data.os, data.touchpoints, data.screen.width),
        screen: `${data.screen.width}x${data.screen.height}`,
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
  await createView(data, session.session_id);
  return session;
};

const getCountryByIP = async (ip) => {
  const geolite2 = await import("geolite2-redist");
  const lookup = await geolite2.open("GeoLite2-Country", (path) => maxmind.open(path));
  try {
    const geoip = await lookup.get(ip);
    lookup.close();
    return geoip.country.iso_code.toLowerCase();
  } catch (e) {
    lookup.close();
    return null;
  }
};

const getBrowserByUA = (userAgent) => {
  if ((userAgent.indexOf("Opera") || userAgent.indexOf("OPR")) !== -1) return "Opera";
  if (userAgent.indexOf("Chrome") != -1) return "Chrome";
  if (userAgent.indexOf("Safari") != -1) return "Safari";
  if (userAgent.indexOf("Firefox") != -1) return "Firefox";
  return "Others";
};

const getDevice = (userAgent, os, touchpoints, width) => {
  let touchscreen = false;
  if ("maxTouchPoints" in touchpoints) {
    if (touchpoints.maxTouchPoints > 0) touchscreen = true;
  } else if ("msMaxTouchPoints" in touchpoints) {
    if (touchpoints.msMaxTouchPoints > 0) touchscreen = true;
  }
  const isMobileOrTablet = /Android|Mobile|Kindle|Silk|iPhone|iPad|iPod|BB10|IEMobile|Windows Phone|Opera Mini/i.test(userAgent);
  const isKindle = /Kindle|Silk/i.test(userAgent);
  if (touchscreen && isMobileOrTablet) {
    if (width < 535 && isKindle) return "Tablet";
    else if (width > 534) return "Tablet";
    else if (width < 535) return "Mobile";
  } else if (touchscreen && os === "MacIntel") return "Tablet"; // iPad Pro
  else if (width > 1024) return "Desktop";
  else return "Others";
};
