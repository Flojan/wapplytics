import { generateNanoID } from "../utils/id";
import client from "../utils/prismadb";

export const getAllWebsiteData = async () => {
  return await client.website.findMany({
    select: {
      id: true,
      website_url: true,
      website_name: true,
    },
  });
};

export const createWebsite = async (params) => {
  return await client.website.create({
    data: {
      website_nanoid: generateNanoID(),
      website_url: params.website_url,
      website_name: params.website_name,
    },
  });
};
