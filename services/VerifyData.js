import client from "../utils/prismadb";

export const getWebsiteByNanoID = async (identifier) => {
  return await client.website
    .findUnique({
      where: {
        website_nanoid: identifier,
      },
      select: { website_url: true },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};

export const websiteValidationCheck = async (identifier, reqHost) => {
  let dbHost = await client.website
    .findUnique({
      where: {
        website_nanoid: identifier,
      },
      select: { website_url: true },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
  if (!dbHost || !reqHost) return false;
  dbHost = dbHost.website_url.split("://")[1];
  return dbHost === reqHost ? true : false;
};
