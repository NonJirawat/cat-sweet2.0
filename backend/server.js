const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const loginRoutes = require('./auth');
const app = express();
const cors = require('cors');
const catsRoutes = require('./cats'); // นำเข้าเส้นทางจากไฟล์ cats.js

app.use('/uploads', express.static('uploads'));


app.use(cors()); // ใช้ CORS middleware

// ใช้ body-parser สำหรับการจัดการ JSON body
app.use(bodyParser.json());

// ใช้เส้นทาง API จาก cats.js
app.use('/api/auth', loginRoutes);
app.use('/api/cats', catsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
