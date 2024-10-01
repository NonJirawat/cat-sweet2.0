const sql = require('mssql');
const config = {
  user: 'sa',
  password: '#Nnonwow12',
  server: 'LAPTOP-L0CV275L',
  database: 'catsweet',
  options: {
    encrypt: true, // true for Azure, false for local SQL Server
    trustServerCertificate: true, // Change to true for local dev / self-signed certs
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql,
  poolPromise,
};
