import fs from "fs";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
          const file = await fs.promises.readFile("tmp/users.json");
          res.status(200).json(JSON.parse(file));
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      } else if(req.method === "POST") {
  fs.promises.writeFile("tmp/users.json", JSON.stringify(JSON.parse(req.body)));
const data=req.body;
  console.log(JSON.parse(req.body));
  res.status(200).json({data});

}
  }