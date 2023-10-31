// Selecciona el boton de "Add" por su ID
const addBtn = document.querySelector("#add-btn");
//Toma el elemento del input para nuevas tareas por su ID
var newTaskInput = document.getElementById('newTaskInput');
//Selecciona el contenedor donde las tareas seran desplegadas
const tasksContainer = document.querySelector("#tasks");
//Toma el elemento del error por su ID
const error = document.getElementById("error");
//Selecciona el elemento que despliega el conteo de tarea por su ID
const countValue = document.querySelector(".count-value");
//Inicializa la cuenta de 0
let taskCount = 0;

//Funcion para actualizar y mostrar el conteo de tareas
const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

//Funcion para agregar una nueva tarea
const addTask = () => {
    //Toma el nombre de la tarea del input, y quita el espacio en blanco
    const taskName = newTaskInput.value.trim();
    //Oculta el mensaje de error inicial
    error.style.display= "none";
    //Checa si el nombre de la tarea esta vacio, en caso de que este vacio muestra un msj de error
    if(!taskName){
        setTimeout(()=>{
            error.style.display = "block";
        }, 200);
        return;
    }

    //Crea un nuevo elemento y lo inserta en su contenedor 
    const task = `<div class="task"> 
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>   
        <button class="edit"> <i class="fa-solid fa-pen-to-square"></i>
        </button>   
        <button class="delete"> 
        <i class="fa-solid fa-delete-left"></i> 
        </button> 
    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", task);

    //Selecciona todos los botones de eliminar y agrega un click event listener para eliminar las tareas
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => {
        button.onclick = () => {
            //Elimina el elemento padre, el cual es la tarea en si
            button.parentNode.remove();
            taskCount -= 1;     //Hace un drecemento en el conteo 
            displayCount(taskCount);    //Actualiza y despliega el conteo de tareas
        };
    })

    //Selecciona todos los botones de editar y agrega un click event listener para editar las tareas
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            //Checa si el objetivo, no es el boton en si 
            if(!(e.target.className == "edit")){
                //fija el elemento al elemento padre (que es la tarea) del boton presionado
                targetElement = e.target.parentElement;
            }
            //Ocupa el campo el input con el nombre de la tarea por editar
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            //Elimina la tarea del display
            targetElement.parentNode.remove();
            taskCount -= 1; //Hace un decremento en el conteo
            displayCount(taskCount);    //Actualiza y despliega el conteo
        };
    });

    //Selecciona todas las checkboxes y agrega un change event listener para actualizar a completado
    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.addEventListener("change", () => {
            //
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                taskCount -= 1; //Hace un decremento si la tarea es marcada completada
            }
            else{
                taskCount += 1; //Hace un inclremento en el conteo si la tarea no esta marcada
            }
            displayCount(taskCount);
        });
    });
    taskCount += 1; //Incrementa el conteo para la nueva tarea agregada
    displayCount(taskCount);    //Actualiza y despliega el conteo de tareas
    newTaskInput.value = "";    //Limpia el campo de la nueva tarea
};

//Agrega un click event listener al boton de "Add" para llamar a la funcion addTask
addBtn.addEventListener("click", addTask); 

//Inicializa el conteo, lo despliega 
window.onload = () => {
    taskCount = 0;  //Reinicia la cuenta de tareas a 0
    displayCount(taskCount);    //Actualiza y despliega el conteo de tareas
    newTaskInput.value = "";    //Limpia el campo de input

}