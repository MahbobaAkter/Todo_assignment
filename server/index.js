

const express = require('express')
const cors = require('cors')


require('dotenv').config();

const { todoRouter } = require('./routes/todo.js')


 


const port = process.env.PORT || 3001;  





const app = express();
app.use(cors());

app.use(express.json());


app.use(express.urlencoded({extended: false}));
app.use('/', todoRouter);





app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})