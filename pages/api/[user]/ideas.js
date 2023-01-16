import fs from "fs";
// import { useParams } from 'react-router-dom';
export default async function handler(req, res) {
  // let {uuid, ideas} = useParams();
    if (req.method === "GET") {
        try {
          const file = await fs.promises.readFile("tmp/ideas.json");
          // let ideas = JSON.parse(file)
          // ideas= ideas.find((entry)=> entry.uuid==uuid);
          // ideas=ideas.ideas;
          res.status(200).json(JSON.parse(file));
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      } else if(req.method === "POST") {
  fs.promises.writeFile("tmp/ideas.json", JSON.stringify(JSON.parse(req.body)));
const data=req.body;
  console.log(JSON.parse(req.body));
  res.status(200).json({data});

}
  }