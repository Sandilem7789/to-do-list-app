document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load saved tasks from local storage
    loadTasks();

    addTaskButton.addEventListener("click", () => {
        if (taskInput.value.trim() !== "") {
            addTask(taskInput.value.trim());
            taskInput.value = ""; // Clear input field
        }
    });

    function addTask(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `${taskText} <button onclick="removeTask(this)">❌</button>`;
        taskList.appendChild(li);

        saveTasks();
    }

    window.removeTask = function(button) {
        button.parentElement.remove();
        saveTasks();
    };

    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#taskList li").forEach(li => {
            tasks.push(li.textContent.replace("❌", "").trim());
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => addTask(task));
    }
});
