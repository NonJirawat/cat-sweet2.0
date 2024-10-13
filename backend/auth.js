const express = require('express');
const { sql, poolPromise } = require('./dbconfig');
const router = express.Router();

// API สำหรับ login
router.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: 'กรุณากรอกอีเมลและรหัสผ่าน' });
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('Email', sql.NVarChar, Email)
      .query('SELECT * FROM Users WHERE Email = @Email');

    const user = result.recordset[0];

    if (!user) {
      return res.status(400).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // ตรวจสอบรหัสผ่านที่ไม่เข้ารหัส
    if (Password !== user.Password) {
      return res.status(400).json({ message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    return res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
  }
});


// API สำหรับการลงทะเบียน
router.post('/register', async (req, res) => {
  try {
    const { NameUser, Email, Password } = req.body;

    if (!NameUser || !Email || !Password) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    const pool = await poolPromise;
    
    // ตรวจสอบว่ามีอีเมลนี้อยู่ในระบบหรือยัง
    const checkEmailResult = await pool
      .request()
      .input('Email', sql.NVarChar, Email)
      .query('SELECT * FROM Users WHERE Email = @Email');

    if (checkEmailResult.recordset.length > 0) {
      return res.status(400).json({ message: 'อีเมลนี้ถูกใช้ไปแล้ว' });
    }

    // เพิ่มข้อมูลผู้ใช้ใหม่
    const result = await pool
      .request()
      .input('NameUser', sql.NVarChar, NameUser)
      .input('Email', sql.NVarChar, Email)
      .input('Password', sql.NVarChar, Password) // ควรใช้การเข้ารหัสรหัสผ่านด้วย bcrypt (หากจำเป็น)
      .query('INSERT INTO Users (NameUser, Email, Password) VALUES (@NameUser, @Email, @Password)');

    return res.status(201).json({ message: 'ลงทะเบียนสำเร็จ' });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียน' });
  }
});

module.exports = router;

