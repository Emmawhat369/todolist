// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskTime = document.getElementById('task-time');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value, taskTime.value);
        taskInput.value = '';
        taskTime.value = '';
    });

    function addTask(task, time) {
        const taskId = Date.now().toString();
        tasks.push({ id: taskId, text: task, time: time });
        renderTasks();
    }

    function editTask(taskId, newText, newTime) {
        tasks = tasks.map(task => task.id === taskId ? { ...task, text: newText, time: newTime } : task);
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <span class="task-time"><i class="fas fa-clock"></i> ${task.time}</span>
                <div class="actions">
                    <button class="edit"><i class="fas fa-pencil-alt"></i></button>
                    <button class="delete"><i class="fas fa-times"></i></button>
                </div>
            `;

            li.querySelector('.edit').addEventListener('click', () => {
                const newText = prompt('Edit task:', task.text);
                const newTime = prompt('Edit time:', task.time);
                if (newText && newTime) {
                    editTask(task.id, newText, newTime);
                }
            });

            li.querySelector('.delete').addEventListener('click', () => {
                deleteTask(task.id);
            });

            taskList.appendChild(li);
        });
    }
});
