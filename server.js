const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/receive/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle file upload and generate route
app.post('/receive/generate', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const originalFilename = req.file.originalname;
    res.json({ filename: originalFilename });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
