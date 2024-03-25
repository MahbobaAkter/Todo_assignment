
import { Task } from "./Task.js";


class Todos 
{
    
    #tasks = [];          
    #backend_url = '';    

   
    constructor(url) 
    {    
        this.#backend_url = url;   
    }


   
    getTasks =  () =>
    {    
        
        return new Promise((resolve, reject) => 
        {
                                       
            fetch(this.#backend_url)

                 
                                                         
            .then((response) =>         
            
                response.json()                  
            ) 

                                                             
            .then((json) =>             
            {                
                this.#readJson(json); 
                resolve(this.#tasks); 
            })
            
            .catch((error) => 
            {                
                reject(error);
            });
        })
    }

   
    #readJson = (tasksAsJson) => 
    {
        
        tasksAsJson.forEach(currentElement => 
        {          
            const task1 = new Task(currentElement.id, currentElement.description);            
            this.#tasks.push(task1);    
        });
    }



    
    addTask = (taskContent) =>   
    {
        
        return new Promise((resolve, reject) => 
        {           
            const json1 = JSON.stringify({ description: taskContent });  

            fetch(this.#backend_url + '/new', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: json1 
            })
            
            .then(response => response.json()) 
            
            .then(json => 
                {                    
                    resolve(this.#addToArray(json.id, taskContent));       
                })


            .catch(error => 
                {               
                reject(error);            
            });
        });
    }

    #addToArray = (id, text) => {
        
        const task1 = new Task(id, text);
      
        this.#tasks.push(task1);
        
        return task1;
    }



   
    removeTask = (id) => 
    {        
        return new Promise((resolve, reject) => 
        {
       
        fetch(this.#backend_url + '/delete/' + id, {
            method: 'delete'
        })

               
                                                         
        .then((response) => response.json())             
        

        .then((json) => 
        {
            this.#removeFromArray(id);       
            
           
            resolve(json.id);     
        })


        .catch((error) => 
        {
            
            reject(error);
        })
        });
    }


    #removeFromArray = (id) => {
      
        const arrayWithoutRemoved = this.#tasks.filter(task => task.id !== id);
        
    
        this.#tasks = arrayWithoutRemoved;
    }

}





export { Todos };