// api/post-handler.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret, message } = req.body;

  // 从环境变量中获取验证信息
  const VERCEL_SECRET = process.env.VERCEL_SECRET;

  // 验证 secret 是否匹配
  if (!VERCEL_SECRET || secret !== VERCEL_SECRET) {
    return res.status(401).json({ error: 'Invalid secret' });
  }

  // 成功响应
  res.status(200).json({
    received: true,
    message,
    timestamp: new Date().toISOString(),
  });
}
