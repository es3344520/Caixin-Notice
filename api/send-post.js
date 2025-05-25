require('dotenv').config();
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const apiUrl = process.env.API_URL;
    const authToken = process.env.AUTH_TOKEN;

    if (!apiUrl || !authToken) {
        return res.status(500).send('Missing environment variables');
    }

    const payload = {
        key1: 'value1',
        key2: 'value2'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while making the request.');
    }
};
