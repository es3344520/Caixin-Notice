import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, username, gistDescription, gistPublic, content } = req.body;

  // Validate required fields
  if (!token || !username || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': username,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: gistDescription || 'Created via Vercel API',
        public: gistPublic || false,
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
