const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/config'); // นำเข้าการเชื่อมต่อฐานข้อมูล

// สร้าง endpoint สำหรับ login
router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    // เชื่อมต่อฐานข้อมูล
    const pool = await poolPromise;

    // ตรวจสอบว่ามีผู้ใช้ในฐานข้อมูลหรือไม่
    const result = await pool
      .request()
      .input('usernameOrEmail', sql.NVarChar, usernameOrEmail)
      .query(`
        SELECT IDUser, NameUser, Email, Password FROM Users 
        WHERE NameUser = @usernameOrEmail OR Email = @usernameOrEmail
      `);

    const user = result.recordset[0];

    if (!user) {
      return res.status(400).json({ success: false, message: 'ไม่พบผู้ใช้' });
    }

    // ตรวจสอบ password แบบไม่ hash
    if (password !== user.Password) {
      return res.status(400).json({ success: false, message: 'ข้อมูลไม่ถูกต้อง' });
    }

    // ส่ง response ว่าล็อกอินสำเร็จ
    res.json({ success: true, message: 'เข้าสู่ระบบสำเร็จ', user: { id: user.IDUser, name: user.NameUser, email: user.Email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในระบบ' });
  }
});

module.exports = router;
