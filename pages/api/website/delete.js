import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (token) {
    // delete website
  } else {
    res.status(401);
  }
}
