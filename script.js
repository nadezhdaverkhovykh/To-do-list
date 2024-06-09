const form = document.getElementById("toDoList");
const input = document.getElementById("listForm");
const toDo = document.getElementById("tasks");
const deletetAll = document.querySelector(".deleteAll");

let toDoList = [];
toDoList = JSON.parse(localStorage.getItem("toDoList")) || [];
displayTask();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let newToDo = {
    todo: input.value,
    checked: false,
    id: Date.now(),
  };
  toDoList.push(newToDo);

  localStorage.setItem("toDoList", JSON.stringify(toDoList));

  displayTask();
});

function displayTask() {
  toDo.innerHTML = "";
  toDoList.forEach(function (elem) {
    const newTask = document.createElement("li");
    newTask.className = "li_style";
    newTask.innerHTML = `
    <span class ="${elem.checked ? "task_done" : ""}">${elem.todo}</span>
     <button class="btn_done" id="done"  > <img src="./src/done.png" </button> <button class="btn_delete" id="delete" ><img src="./src/delete.png"</button> `;

    toDo.append(newTask);
    newTask.querySelector(".btn_delete").addEventListener("click", function () {
      deleteHandler(elem.id);
    });
    newTask.querySelector(".btn_done").addEventListener("click", function () {
      doneTasks(elem.id);
    });
  });
}

function deleteHandler(id) {
  toDoList = toDoList.filter(function (elem) {
    return !(id == elem.id);
  });
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  displayTask();
}

const deleteAll = document
  .querySelector(".deleteAll")
  .addEventListener("click", function () {
    toDoList = [];
    displayTask();
    localStorage.clear("toDoList");
  });

const deleteDone = document
  .querySelector(".deleteDone")
  .addEventListener("click", function () {
    deleteDonetasks();
  });

function deleteDonetasks() {
  toDoList = toDoList.filter(function (elem) {
    return !elem.checked;
  });
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  displayTask();
}

function doneTasks(id) {
  const task = toDoList.find((e) => e.id === id);
  task.checked = !task.checked;
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  displayTask();
}
