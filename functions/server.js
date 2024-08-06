// server.js
const express = require('express');
const cors = require('cors');
const format = require('./format.js');
const app = express();

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Root endpoint
app.get('/health', (req, res) => {
    res.send('Agility Code Chunks Server UP!');
});

app.post('/api/format', (req, res) => {
    const { code, language } = req.body;
    if (!code || !language) {
        return res.status(400).send('Code and language are required.');
    }
    format.formatCode(code, language)
        .then((formattedCode) => {
            if (!formattedCode) {
                return res.status(500).send('Formatting failed.');
            }
            res.send(formattedCode);
        })
        .catch((error) => {
            console.error('Error formatting code:', error);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = app;