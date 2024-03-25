const BACKEND_ROOT_URL = 'http://localhost:3001'
import { Todos } from "./class/Todos.js";
const todos = new Todos(BACKEND_ROOT_URL);


const button = document.querySelector('#btn');

const list = document.querySelector('ul');
const input = document.querySelector('input');

input.disabled =true;


        

const renderTask = function(addedTask)
{
    const li = document.createElement('li');

    li.setAttribute('class', 'list-group-item'); 
    li.setAttribute('data-key', addedTask.getId().toString());


    renderSpan(li, addedTask.getText());
    renderLink(li, addedTask.getId());  


    list.appendChild(li);

}



const renderSpan = (li, text) => 
{
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span); 

}




const getTasks = () => 

{
    todos.getTasks()   
    .then((tasks) => 
    {
        
        tasks.forEach((currentTask) => 
        {
           
            renderTask(currentTask);
        });

        input.disabled = false;
    })
    .catch((error) => 
    {               
        alert(error);
    });
  };

  getTasks(); 

  const renderLink = (li, id) =>
  {
    const a = document.createElement('a'); 
    a.innerHTML = '<i class="bi bi-trash"></i>';
    a.setAttribute('style', 'float: right'); 
    a.setAttribute('href', '#');  
    a.setAttribute('data-id', id);  
    li.appendChild(a);  
  

  a.addEventListener('click', function(event) 
    {
        event.preventDefault(); 

        todos.removeTask(id)    
        .then(() =>     
        {
            li.remove(); 
        })
        
        .catch((error) =>   
        {
            alert(error); 
        });
    });
    
}




button.addEventListener('click', function(event) 
{
    event.preventDefault();
    const taskContent = input.value.trim();

    if (taskContent !== '') 
    {
     todos.addTask(taskContent)
     .then((addedTask) =>  
     { 
        renderTask(addedTask);  
        input.value = ''; 
        input.focus();   
    })

    .catch((error) => 
    {
        console.error("An error occurred:", error);
        alert("Error: " + error.message);
    });
  
}


});  