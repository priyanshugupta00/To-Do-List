/* LOAD TASKS WHEN PAGE OPENS */

window.onload = loadTasks;

/* LOAD TASKS */

async function loadTasks() {

    const response = await fetch('/tasks');

    const tasks = await response.json();

    const taskList = document.getElementById('taskList');

    taskList.innerHTML = '';
const total =
document.getElementById("totalTasks");

if(total){

    total.innerText =
    tasks.length;
}

    tasks.forEach((task, index) => {

        const li = document.createElement('li');

        li.innerHTML = `
            ${task}

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

/* ADD TASK */

async function addTask() {

    const taskInput = document.getElementById('taskInput');

    const taskText = taskInput.value.trim();

    if (taskText === '') {

        alert('Please enter a task');

        return;
    }

    await fetch('/tasks', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            task: taskText
        })
    });

    taskInput.value = '';

    loadTasks();
}

/* DELETE TASK */

async function deleteTask(index) {

    await fetch(`/tasks/${index}`, {

        method: 'DELETE'
    });

    loadTasks();
}

/* HOME PAGE BUTTON */

function showMessage() {

    alert("Welcome to Priyanshu Gupta's Web Technology Project");
}

window.addEventListener("load", () => {

    const now = new Date();

    const dateString =
        now.toLocaleDateString() +
        " " +
        now.toLocaleTimeString();

    const dateElement =
        document.getElementById("currentDate");

    if (dateElement) {

        dateElement.innerText =
        "Current Date & Time: " +
        dateString;
    }
});

window.addEventListener("load", () => {

    const now = new Date();

    const dateString =
        now.toLocaleDateString() +
        " " +
        now.toLocaleTimeString();

    const dateElement =
        document.getElementById("currentDate");

    if(dateElement){
        dateElement.innerText =
            "Current Date & Time: " + dateString;
    }
});

function searchTasks() {

    let input =
    document.getElementById("searchTask")
    .value.toLowerCase();

    let items =
    document.querySelectorAll("#taskList li");

    items.forEach(item => {

        let text =
        item.innerText.toLowerCase();

        item.style.display =
        text.includes(input)
        ? ""
        : "none";
    });
}

function contactMessage(event){

    event.preventDefault();

    alert(
        "Thank you for contacting us."
    );
}