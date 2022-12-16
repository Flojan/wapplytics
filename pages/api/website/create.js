export default async function handler(req, res) {
  const data = await createWebsite(req.body);

  return res.status(200).json({ data: data });
}
