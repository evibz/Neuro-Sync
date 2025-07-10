export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body. "messages" must be an array.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
      }),
    });

    const data = await response.json();

    // Debugging: log API errors if any
    if (!response.ok) {
      console.error('OpenAI API Error:', data);
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('GPT Proxy Error:', error);
    res.status(500).json({ error: 'Internal server error while contacting OpenAI.' });
  }
}
