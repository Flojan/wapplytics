import { getAllUserData } from "../../../services/UserData";

export default async function handler(req, res) {
  const data = await getAllUserData();

  return res.status(200).json({ data: data });
}
