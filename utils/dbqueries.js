import client from "./prismadb";

export const getUsers = async () => {
  return await client.user.findMany().catch((e) => {
    console.log("ERROR", e);
  });
};
