import { hashPassword } from "../utils/hash";
import client from "../utils/prismadb";

export const getAllUserData = async () => {
  return await client.user
    .findMany({
      select: {
        id: true,
        username: true,
        password: true,
        admin: true,
        settings: true,
        active_tiles: true,
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};

export const createUser = async (props) => {
  if (await getUserByUsername(props.username)) {
    return "User already exists!";
  }
  return await client.user
    .create({
      data: {
        username: props.username,
        password: await hashPassword(props.password),
        admin: props.admin,
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};

const getUserByUsername = async (username) => {
  return await client.user
    .findUnique({
      where: {
        username: username,
      },
    })
    .catch((e) => {
      console.log("ERROR", e);
    });
};
