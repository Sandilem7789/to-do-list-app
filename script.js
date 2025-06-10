document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load saved tasks from local storage
    loadTasks();

    // Add event listener for the "Add Task" button
    addTaskButton.addEventListener("click", () => {
        if (taskInput.value.trim() !== "") {
            addTask(taskInput.value.trim());
            taskInput.value = ""; // Clear input field
        }
    });

    // Function to add a new task
    function addTask(taskText, completed = false) {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${completed ? "checked" : ""}>
            <span class="task-text${completed ? " completed" : ""}">${taskText}</span>
            <button id="deleteButton" onclick="removeTask(this)">❌</button>
        `;
        taskList.appendChild(li);

        // Add event listener for checkbox
        li.querySelector(".task-checkbox").addEventListener("change", function() {
            li.querySelector(".task-text").classList.toggle("completed", this.checked);
            saveTasks();
        });

        saveTasks();
    }

    // Add event listener for Enter key in input field
    taskInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            if (taskInput.value.trim() !== "") {
                addTask(taskInput.value.trim());
                taskInput.value = ""; // Clear input field
            }
        }
    });

    // Function to remove a task
    window.removeTask = function(button) {
        button.parentElement.remove();
        saveTasks();
    };

    // Save tasks to local storage
    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#taskList li").forEach(li => {
            const text = li.querySelector(".task-text").textContent;
            const completed = li.querySelector(".task-checkbox").checked;
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => addTask(task.text, task.completed));
        
    }
});
