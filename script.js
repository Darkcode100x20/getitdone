const addBtn = document.querySelector("#add-btn");
var newTaskInput = document.getElementById('newTaskInput');
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display= "none";
    if(!taskName){
        setTimeout(()=>{
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = '<div class="task> <input type="checkbox" class="task-check">\n    <span class="taskname">${taskName}</span>\n   <button class="edit"> <i class="fa-solid fa-pen-to-square"></i> </button>\n   <button class="delete"> <i class="fa-solid fa-delete-left"></i> </button>\n </div>';
    tasksContainer.insertAdjacentHTML
    ("beforeend", task);

};

addBtn.addEventListener("click", addTask);