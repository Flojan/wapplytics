import { generateNanoID } from "../utils/id";
import client from "../utils/prismadb";

export const getAllWebsiteData = async () => {
  return await client.website.findMany({
    select: {
      id: true,
      website_url: true,
      website_name: true,
      website_nanoid: true,
    },
  });
};

export const createWebsite = async (props) => {
  console.log(props);
  return await client.website
    .create({
      data: {
        website_nanoid: generateNanoID(),
        website_url: props.website_url,
        website_name: props.website_name,
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};
