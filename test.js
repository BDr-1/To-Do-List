//input for text
let input = document.querySelector(".input");
//add button
let add =document.querySelector(".add");
let tasksDiv=document.querySelector(".tasks");
let deleteAll = document.querySelector(".deleteAll");
let doneAll = document.querySelector(".doneAll");

let arrayOfTasks = [];

if(window.localStorage.getItem("Tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("Tasks"));
}

gettaskfromlocal();
//Add Tasks
  
     

 deleteAll.onclick = function(){
    localStorage.clear();
    tasksDiv.innerHTML = "";
    deleteAll.style.display= "none";
     doneAll.style.display= "none";
}

//Done All
doneAll.addEventListener("click",(e)=>{
   if(e.target.classList.contains("doneAll")){
       for(let i = 0; i<arrayOfTasks.length;i++){
           if(arrayOfTasks[i].complated==false){
               arrayOfTasks[i].complated = true;
           }
       }
      
   }
     addToLocalStorage(arrayOfTasks);
    addTasksTopage(arrayOfTasks);
})
add.onclick = function(){
   if(input.value != ""){
       //Function of Add
       addTasksToArray(input.value);
       input.value = "";
       deleteAll.style.display= "block";
       doneAll.style.display= "block";
   }
}

tasksDiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("del")){
        deleteTaskFromLocalStorage(e.target.parentElement.parentElement.getAttribute("data-id"));
        e.target.parentElement.parentElement.remove();
    }
    if(e.target.classList.contains("spanDone")){
        taskStatus(e.target.parentElement.parentElement.getAttribute("data-id"));
        e.target.parentElement.parentElement.classList.toggle("done");
    }

})

function addTasksToArray(taskText){
   //Task Data
   const task = {
       id:Date.now(),
       title:taskText,
       complated:false
   };
   arrayOfTasks.push(task);
   addTasksTopage(arrayOfTasks);
   addToLocalStorage(arrayOfTasks);
}
function addTasksTopage(arrayOfTasks){
    //Empity input
    tasksDiv.innerHTML= "";
    arrayOfTasks.forEach(task => {
        let div = document.createElement("div");
        div.className = "task";
        if(task.complated==true){
            div.className="task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
         let divIcons = document.createElement("div");
         let doneSpan = document.createElement("span");
         doneSpan.className= "spanDone";
         doneSpan.appendChild(document.createTextNode("Done"));

         
        let span = document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("X"));
        
        divIcons.appendChild(doneSpan);
        divIcons.appendChild(span);
        
        div.appendChild(divIcons);
        tasksDiv.appendChild(div);
      

    });
}

function addToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
}
function gettaskfromlocal(){
    let data = window.localStorage.getItem("Tasks");
    if(data){
        let task = JSON.parse(data);
         addTasksTopage(task);
         doneAll.style.display= "block";
    }else{
        deleteAll.style.display= "none";
    }
    
}
function deleteTaskFromLocalStorage(taskId){
//    for(let i =0;i<arrayOfTasks.length;i++){
//        console.log(`${arrayOfTasks[i].id}==${taskId}`);
//    }
arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
addToLocalStorage(arrayOfTasks);
}
function taskStatus(taskId){
for(let i =0 ; i<arrayOfTasks.length;i++){
    if(arrayOfTasks[i].id==taskId){
 if(arrayOfTasks[i].complated==false){
        arrayOfTasks[i].complated=true;
    }else{
        arrayOfTasks[i].complated=false;
    }
    }
    }
addToLocalStorage(arrayOfTasks);
}
