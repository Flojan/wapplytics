import { getToken } from "next-auth/jwt";
import { getAllUserData } from "../../../services/UserData";

export default async function handler(req, res) {
  const token = await getToken({ req });

  if (token) {
    const data = await getAllUserData();

    return res.status(200).json({ data: data });
  } else {
    res.status(401);
  }
}
