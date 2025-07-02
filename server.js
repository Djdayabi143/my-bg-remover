

const express = require('express');
const fetch = require('node-fetch');
const FormData = require('form-data');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.post('/api/remove', async (req, res) => {
  const form = new FormData();
  req.pipe(form);

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: { 'X-Api-Key': 'WSe49S9o6XiDFL5VBWkNr17o' }, // 🔑 Your API Key
    body: form
  });

  if (!response.ok) {
    const error = await response.text();
    return res.status(400).send(error);
  }

  const buffer = await response.buffer();
  res.set('Content-Type', 'image/png');
  res.send(buffer);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));