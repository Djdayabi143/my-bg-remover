const express = require('express');
const fetch = require('node-fetch');
const FormData = require('form-data');
const app = express();

app.use(express.static('.'));

app.post('/api/remove', async (req, res) => {
  const form = new FormData();
  req.pipe(form);
  const reply = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: { 'X-Api-Key': 'WSe49S9o6XiDFL5VBWkNr17o' },
    body: form
  });

  if (!reply.ok) {
    res.status(reply.status).send(await reply.text());
  } else {
    const blob = await reply.buffer();
    res.set('Content-Type', 'image/png').send(blob);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Running on port', port));