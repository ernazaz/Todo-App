var todoList = [];
var doneList = [];
var monthList = new Array( "Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var input = document.getElementById("task");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        var task = document.getElementById("task").value;
        if(task){
            addTaskToList(task);
        document.getElementById("task").value = "";
        }
    }
});

function createTask(task,date) {
    this.task = task;
    this.date = date;
}

function addTaskToList(task){
    var date = new Date();
    var mon = monthList[date.getMonth()];
    var existingDate = mon+' ' + date.getDate()+" "+date.getFullYear();
    var t = new createTask(task,existingDate);
         todoList.push(t);
        saveListToLocalStorage();
        appendToList(task,existingDate);
}

function appendToList(task,date){
    var list = document.getElementById("todo");
    var item = document.createElement('li');
    var smalls = document.createElement('small');
    smalls.innerHTML = date
    var par = document.createElement('p');
    par.innerHTML = task;
    var check = document.createElement('button');
    check.innerHTML = '<i class="fa fa-check checked" aria-hidden="true"></i>';
    check.classList.add('add');
    check.addEventListener('click',getIndex);
    item.append(smalls);
    item.appendChild(check);
    item.appendChild(par);
    list.appendChild(item);
    showNumbers();
}

function appendToDoneList(task){
    var list = document.getElementById("done");
    var item = document.createElement('li');
    var dels = document.createElement('del');
    dels.innerHTML = task;
    item.append(dels);
    list.append(item);
    showNumbers();
}


function saveListToLocalStorage(){
    var str = JSON.stringify(todoList);
    var str2 = JSON.stringify(doneList);
    localStorage.setItem("todoList",str);
    localStorage.setItem("doneList",str2);
    
}
function getListsFromLocal(){
    var str = localStorage.getItem("todoList");
    var str2 = localStorage.getItem("doneList");
    todoList = JSON.parse(str);
    if (!todoList) {
       todoList = [];
       }
       doneList = JSON.parse(str2);
    if (!doneList) {
       doneList = [];
       }
        for (i = 0; i<todoList.length; i++){
            appendToList(todoList[i].task,todoList[i].date,i);
    }
     for (i = 0; i<doneList.length; i++){
            appendToDoneList(doneList[i].task);
    }
}

function getIndex(){
      var items = document.querySelectorAll('#todo li')
    var itemList = [];
    var liIndex;
    for(i=0; i<items.length; i++){
        itemList.push(items[i].innerHTML);
    }
    for(var i=0; i<items.length; i++){
        items[i].onclick = function(){
         liIndex = itemList.indexOf(this.innerHTML);
            doneTask(liIndex);
        }
    }
    
}
function doneTask(index){
      var items = document.querySelectorAll('#todo li')
    for(i=0; i<todoList.length; i++){
        if(i === index){
      items[i].parentNode.removeChild(items[i]);
        var t = new createTask(todoList[index].task,todoList[index].date);
            appendToDoneList(todoList[index].task);
            doneList.push(t);
            todoList.splice(index, 1);
             saveListToLocalStorage();
            showNumbers();
        }
    }
}
function showNumbers(){
    var totalLength = todoList.length+doneList.length;
var todoPercentage =(todoList.length/totalLength)*100;
var donePercentage = (doneList.length/totalLength)*100;
var fixedTodo = todoPercentage.toFixed();
var fixedDone = donePercentage.toFixed();
document.getElementById("donePencentage").innerHTML = "- "+doneList.length+"/"+ totalLength+" ("+fixedDone+")%";
document.getElementById("percentage").innerHTML = "- "+todoList.length+"/"+ totalLength+" ("+fixedTodo+")%";
}
getListsFromLocal();



