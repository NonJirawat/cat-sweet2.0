const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // ถ้าต้องการใช้งาน CORS
const loginRoutes = require('./routes/login'); // นำเข้าเส้นทาง login

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // ถ้า frontend กับ backend อยู่คนละโดเมน
app.use(bodyParser.json()); // สำหรับ parse ข้อมูล JSON จาก request

// Routes
app.use('/api/users', loginRoutes); // เส้นทาง login: /api/users/login

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานบนพอร์ต ${PORT}`);
});
