// script.js

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    const task = taskInput.value;
    const priority = priorityInput.value;

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const tasks = getTasksFromLocalStorage();
    tasks.push({ task, priority, status: "pending" });
    saveTasksToLocalStorage(tasks);

    taskInput.value = "";
    priorityInput.value = "normal";

    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = getTasksFromLocalStorage();
    tasks.forEach((taskObj, index) => {
        const li = document.createElement("li");
        if (taskObj.status === "completed") {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${taskObj.task} (${taskObj.priority})</span>
            <div class="task-buttons">
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
                <button class="toggle" onclick="toggleTaskStatus(${index})">${taskObj.status === "pending" ? "Complete" : "Undo"}</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function editTask(index) {
    const tasks = getTasksFromLocalStorage();
    const taskObj = tasks[index];
    const newTask = prompt("Edit task:", taskObj.task);
    const newPriority = prompt("Edit priority (low, normal, high):", taskObj.priority);

    if (newTask !== null && newTask !== "" && newPriority !== null && newPriority !== "") {
        taskObj.task = newTask;
        taskObj.priority = newPriority;
        saveTasksToLocalStorage(tasks);
        renderTasks();
    }
}

function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function toggleTaskStatus(index) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}
