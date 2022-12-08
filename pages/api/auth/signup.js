import { hashPassword } from "../../../utils/auth";
import { getUsers } from "../../../utils/dbqueries";
import prisma from "../../../utils/prismadb";

export default async function handler(req, res) {
  // const token = await getToken({ req });
  // console.log("TOKEN:", token.admin);
  // if (!token.admin) {
  //   res.json({ message: "Not allowed." });
  // }
  //middleware

  if (req.method === "POST") {
    if (!req.body.username || !req.body.password) {
      return res.status(422).json({ message: "Missing username or password" });
    }
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    if (user) {
      res.status(422).json({ message: "User already exists!" });
    }
    await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        admin: req.body.admin,
      },
    });
    res.status(200).json({ message: "User created" });
  } else if (req.method === "GET") {
    const users = await getUsers();
    // const users = await prisma.user.findMany();
    res.json(users);
  }
}
