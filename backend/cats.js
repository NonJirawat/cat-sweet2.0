const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { sql, poolPromise } = require('./dbconfig');

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');  // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Check the file name
    },
});


const upload = multer({ storage });

// POST API สำหรับการอัปโหลดรูปภาพแมว
router.post('/', upload.single('image'), async (req, res) => {
    const { name, breed, age, location } = req.body;
    const image = req.file ? req.file.filename : '';

    if (!req.file) {
        return res.status(400).send('No image uploaded');
    }

    try {
        const pool = await poolPromise;
        const request = pool.request();
        const query = `INSERT INTO Cats (Name, Breed, Age, Location, Image) 
                       VALUES (@name, @breed, @age, @location, @image)`;

        request.input('name', sql.NVarChar, name);
        request.input('breed', sql.NVarChar, breed);
        request.input('age', sql.NVarChar, age);
        request.input('location', sql.NVarChar, location);
        request.input('image', sql.NVarChar, image);

        await request.query(query);
        res.status(201).send('Cat profile created');
    } catch (err) {
        console.log('Error inserting data:', err);
        res.status(500).send(`Error inserting data: ${err}`);
    }
});

// GET API สำหรับดึงข้อมูลแมวทั้งหมด
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Cats');
        res.status(200).json(result.recordset); // ส่งข้อมูลแมวทั้งหมดกลับไป
    } catch (err) {
        res.status(500).send('Error fetching cat data');
    }
});

module.exports = router;
