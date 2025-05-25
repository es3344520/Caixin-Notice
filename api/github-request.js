// api/github-request.js

export default async function handler(req, res) {
  // 只允许 POST 方法
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { content } = req.body;

  // 从 Vercel 环境变量获取验证信息
  const secretToken = process.env.SECRET_TOKEN;

  // 检查是否设置环境变量或内容为空
  if (!secretToken || !content) {
    return res.status(401).json({ error: 'Unauthorized or missing content' });
  }

  try {
    const response = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        Authorization: `token ${secretToken}`,
        'User-Agent': 'VercelFunction',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: 'Created via Vercel Function',
        public: false,
        files: {
          'example.txt': {
            content: content,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
