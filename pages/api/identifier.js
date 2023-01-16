import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
    if (req.method === "GET") {
        try {
    res.status(200).json({ uuid: uuidv4() })
} catch (e) {
    res.status(500).json({ error: e.message });
  }
}
  }