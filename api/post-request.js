// api/post-request.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data } = req.body;

  const url = 'https://example.com/api'; // 替换为你要请求的目标 URL
  const token = process.env.MY_API_TOKEN; // 从环境变量中读取 token

  if (!token) {
    return res.status(500).json({ error: 'Missing token in environment variables' });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
