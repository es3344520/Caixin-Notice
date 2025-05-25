// pages/api/post.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret, message } = req.body;

  const VERCEL_SECRET = process.env.VERCEL_SECRET;

  if (!VERCEL_SECRET || secret !== VERCEL_SECRET) {
    return res.status(401).json({ error: 'Invalid secret' });
  }

  res.status(200).json({
    received: true,
    message,
    timestamp: new Date().toISOString(),
  });
}
