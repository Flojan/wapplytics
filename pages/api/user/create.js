import { createUser } from "../../../services/UserData";

export default async function handler(req, res) {
  const data = await createUser(req.body);

  return res.status(200).json({ data: data });
}
