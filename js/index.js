const BACKEND_ROOT_URL = 'http://localhost:3001'
import { Todos } from "./class/Todos.js";
const todos = new Todos(BACKEND_ROOT_URL);


const btn1 = document.querySelector('#button_addTask');

const list1 = document.querySelector('ul');
const input1 = document.querySelector('input');

input1.disabled =true;

//*input.addEventListener('keypress', (event) =>  {
    //if (event.key === 'Enter') {
        //event.preventDefault()
        //const task= input.value.trim();
        //if (task !== '') {
            //const li = document.createElement('li');
            //li.setAttribute('class','list-group-item');
            //li.innerHTML = task;
            //list.append(li);
            //input.value = '';

        

const renderTask = function(addedTask)
{
    
}

const li = document.createElement('li');

li.setAttribute('class', 'list-group-item'); 
li.setAttribute('data-key', addedTask.getId().toString());


renderSpan(li, addedTask.getText());
renderLink(li, addedTask.getId());  
renderEditLink(li, addedTask.getId(), addedTask.getText()); 


list1.appendChild(li);

const renderSpan = (li, text) => 
{

}

const span = document.createElement('span');
span.textContent = text;
li.appendChild(span); 


const getTasks = () => 

{
    todos.getTasks()   
    .then((tasks) => 
    {
        
        tasks.forEach((currentTask) => 
        {
           
            renderTask(currentTask);
        });

        input1.disabled = false;
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
        event.preventDefault(); // Prevent the link from changing the URL

        todos.removeTask(id)    //*** //*** <<< RUN THE DELETE FUNCTION >>> ***
        .then(() =>     //If the Task delete success Remove the whole Task List Item
        {
            li.remove(); // Remove the list item from the DOM
        })
        
        .catch((error) =>   //If the Task delete fails
        {
            alert(error); // Alert the error if something goes wrong
        });
    });
    
}

const renderEditLink = (li, id, text) => 
{
    const a = document.createElement('a'); 
    a.innerHTML = '<i class="bi bi-pencil-square"></i>';
    a.setAttribute('style', 'float: right; margin-left: 10px;');
    a.setAttribute('href', '#');  
    a.addEventListener('click', function(event) 
    {
        event.preventDefault();
        const newText = prompt('Edit Task:', text); 
        if (newText != null && newText.trim() !== '') 
        todos.updateTask(id, newText.trim())}
    
        .then(updatedTask => {
            // Find the span in the list item and update its text content
            const span = li.querySelector('span');
            span.textContent = updatedTask.description;
        }))

        .catch(error => {
            alert(error); // Alert the error if something goes wrong
        });
    }

li.appendChild(a); // Append the edit link to the list item


btn1.addEventListener('click', function(event) 
{
    event.preventDefault();
    const taskContent = input1.value.trim();

    if (taskContent !== '') 
    {
     todos.addTask(taskContent)
     .then((addedTask) =>  
     { 
    renderTask(addedTask);  
    input1.value = ''; 
    input1.focus();   
  
})

.catch((error) => 
{
    console.error("An error occurred while saving the task:", error);
    alert("Error saving task: " + error.message);
});
}
});  