// api/post-request.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 从请求头中获取 token
  const requestToken = req.headers['authorization']?.split(' ')[1];

  // 从环境变量中读取预设的 token
  const validToken = process.env.MY_API_TOKEN;

  // 验证 token
  if (!validToken || requestToken !== validToken) {
    return res.status(401).json({ error: 'Invalid or missing token' });
  }

  // 返回接收到的数据（或做其他处理）
  return res.status(200).json({
    message: 'Authentication successful',
    receivedData: req.body,
  });
}
