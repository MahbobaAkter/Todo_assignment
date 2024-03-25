//********The code for the Todo app backend =========================

const express = require('express')
const cors = require('cors')
// Removing Pool since we are now using db.js for database interactions -->
//const { Pool } = require('pg')

// Import the router from todo.js
const { todoRouter } = require('./routes/todo.js')


//const port = 3001
// Load environment variables from .env file
 
require('dotenv').config();
//Without .env file -->  const port = 3001;
const port = process.env.PORT || 3000;  


// Creates the Express application to set up our HTTP server.


const app = express();
app.use(cors());

app.get("/",async (req,res) => {
   try {
    const pool = openDb()
    const result = await pool.query(
        'select * from post'
    )
    const rows = result.rows ? result.rows : []
    res.status(200).json(rows)

   } catch(error) {
    res.statusMessage = error
    res.status(500).json({error: error})

   }
})



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', todoRouter);




const openDb = () => {
    const pool = new Pool ({
        user: "postgres",
        host: "localhost",
        database: "Todo",
        password: "mithila",
        port: 5432
    })
    return pool
}


app.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
})