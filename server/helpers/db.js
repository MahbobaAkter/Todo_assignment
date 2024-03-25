// Import the 'dotenv' package to be able to use environment variables from the .env file
require('dotenv').config();
// Import the 'pg' library, which allows us to interact with PostgreSQL databases
const { Pool } = require('pg');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const query = (sql, values = []) => 
{
  return new Promise((resolve, reject) => 
  {
    pool.query(sql, values)

      .then(res => resolve(res))
      
      .catch(err => reject(err));
  });
};


  



module.exports = { query };