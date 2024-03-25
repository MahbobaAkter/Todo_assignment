// Import express and destruct the Router class from it
const express = require('express');
const { query } = require('../helpers/db.js'); 


// Create a new router object to handle routes for todo-related endpoints
const todoRouter = express.Router();





todoRouter.get('/', async (req, res) => 
{
  try 
  {
      // The 'query' function is used instead of the 'pool.query' directly.
      // It simplifies error handling by allowing the use of try/catch with async/await.
        
        // The 'ASC' keyword specifies an ascending order.
      const result = await query('SELECT * FROM task ORDER BY id ASC');

      // Send the retrieved rows as JSON. If no rows are found, an empty array is returned.
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
      
      const result = await query('INSERT INTO task (description) VALUES ($1) RETURNING *', 
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
      
      const result = await query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
      
           
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




todoRouter.put("/update/:id", async (req, res) => {
    try {    
      const id = parseInt(req.params.id);   
      
      const { description } = req.body;   
  
     
      const result = await query(
        "UPDATE task SET description = $1 WHERE id = $2 RETURNING *",
        [description, id]
      );
  
     
      if (result.rowCount === 0) 
      {
        res.status(404).json({ message: 'Task not found' });
      } 
      else 
      {
        
        res.status(200).json(result.rows[0]);
      }
    } 
    
    catch (error) {
     
      console.error('Error updating task:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  

  module.exports = todoRouter;