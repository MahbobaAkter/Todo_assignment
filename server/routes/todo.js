
const express = require('express');
const { query } = require('../helpers/db.js'); 



const todoRouter = express.Router();





todoRouter.get('/', async (req, res) => 
{
  try 
  {
      
      const result = await query('SELECT * FROM post');

      res.status(200).json(result.rows);
  } 
  catch (error) 
  {
     
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});


todoRouter.post("/new", async (req, res) => 
{
  try 
  {
      
      const result = await query('INSERT INTO post (description) VALUES ($1) RETURNING *', 
      [req.body.description]);
      
      res.status(200).json(result.rows[0]);
  } 
  catch (error) 
  {
      
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});



todoRouter.delete("/delete/:id", async (req, res) => 
{
  try 
  {
      const id = Number(req.params.id);
      
      const result = await query('DELETE FROM post WHERE id = $1 RETURNING *', [id]);
      
           
      if (result.rowCount === 0) 
      {
          res.status(404).json({ message: 'Task not found' });
      } 
      else 
      {
          
          res.status(200).json({ id: result.rows[0].id });
      }
  } 
  catch (error) 
  {
      
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});




 
  
  

  module.exports = todoRouter;