// api/data.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret, data } = req.body;

  const API_SECRET = process.env.API_SECRET;

  if (!API_SECRET) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  if (secret !== API_SECRET) {
    return res.status(401).json({ error: 'Invalid secret key' });
  }

  res.status(200).json({
    message: 'Success',
    receivedData: data,
  });
}
