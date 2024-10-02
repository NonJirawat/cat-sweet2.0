const express = require('express');
const cors = require('cors'); // นำเข้า CORS

const app = express();

// เปิดใช้งาน CORS สำหรับทุกคำขอ
app.use(cors());

// ส่วนที่เหลือของโค้ดเซิร์ฟเวอร์
app.use(express.json());

app.use('/api/auth', require('./auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
