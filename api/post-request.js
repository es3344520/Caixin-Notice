// api/post-request.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { data } = req.body;

  const authKey = process.env.AUTH_API_KEY;
  const apiUrl = 'https://example.com/api/endpoint';

  if (!authKey) {
    return res.status(500).json({ error: 'Missing AUTH_API_KEY environment variable' });
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authKey}`,
      },
      body: JSON.stringify({ data }),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error making POST request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
