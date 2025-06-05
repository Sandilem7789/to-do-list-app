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

    taskInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            if (taskInput.value.trim() !== "") {
                addTask(taskInput.value.trim());
                taskInput.value = ""; // Clear input field
            }
        }
    });

    window.removeTask = function(button) {
        button.parentElement.remove();
        saveTasks();
    };

    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#taskList li").forEach(li => {
            const text = li.querySelector(".task-text").textContent;
            const completed = li.querySelector(".task-checkbox").checked;
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => addTask(task.text, task.completed));
        
    }
});
