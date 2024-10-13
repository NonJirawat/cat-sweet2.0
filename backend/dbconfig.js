const sql = require('mssql');

const dbConfig = {
  user: 'sa',
  password: '#Nnonwow12',
  server: 'LAPTOP-L0CV275L',
  database: 'UserDatabase',
  options: {
    encrypt: true, // ใช้ในกรณีที่ต้องการการเข้ารหัสข้อมูล
    enableArithAbort: true,
    trustServerCertificate: true // แก้ไขตรงนี้
  }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.log('Database Connection Failed! Bad Config: ', err);
    });

// ส่งออกทุกอย่างเป็นอ็อบเจ็กต์เดียว
module.exports = { sql, poolPromise, dbConfig };
