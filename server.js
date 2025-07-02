const express = require('express');
const fetch = require('node-fetch');
const multer = require('multer');
const FormData = require('form-data');
const cors = require('cors');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.static('public'));

// Image Upload Route
app.post('/api/remove', upload.single('image_file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded.');
  }

  const formData = new FormData();
  formData.append('image_file', fs.createReadStream(req.file.path));
  formData.append('size', 'auto');

  try {
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'WSe49S9o6XiDFL5VBWkNr17o' // 🧠 आपकी API Key
      },
      body: formData
    });

    fs.unlinkSync(req.file.path); // Delete uploaded file from server

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).send(error);
    }

    const buffer = await response.buffer();
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

