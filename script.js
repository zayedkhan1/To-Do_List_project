// DOM Elements
const todoTab = document.getElementById('todoTab');
const heatmapTab = document.getElementById('heatmapTab');
const trackerTab = document.getElementById('trackerTab');
const todoSection = document.getElementById('todoSection');
const heatmapSection = document.getElementById('heatmapSection');
const trackerSection = document.getElementById('trackerSection');

const taskInput = document.getElementById('taskInput');
const taskCategory = document.getElementById('taskCategory');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const heatmap = document.getElementById('heatmap');
const activityTracker = document.getElementById('activityTracker');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Navigation Logic
todoTab.addEventListener('click', () => {
  todoSection.classList.remove('hidden');
  heatmapSection.classList.add('hidden');
  trackerSection.classList.add('hidden');
  todoTab.classList.add('text-blue-600', 'font-bold');
  heatmapTab.classList.remove('text-blue-600', 'font-bold');
  trackerTab.classList.remove('text-blue-600', 'font-bold');
});

heatmapTab.addEventListener('click', () => {
  todoSection.classList.add('hidden');
  heatmapSection.classList.remove('hidden');
  trackerSection.classList.add('hidden');
  heatmapTab.classList.add('text-blue-600', 'font-bold');
  todoTab.classList.remove('text-blue-600', 'font-bold');
  trackerTab.classList.remove('text-blue-600', 'font-bold');
  generateHeatmap();
});

trackerTab.addEventListener('click', () => {
  todoSection.classList.add('hidden');
  heatmapSection.classList.add('hidden');
  trackerSection.classList.remove('hidden');
  trackerTab.classList.add('text-blue-600', 'font-bold');
  todoTab.classList.remove('text-blue-600', 'font-bold');
  heatmapTab.classList.remove('text-blue-600', 'font-bold');
  updateActivityTracker();
});

// To-Do List Logic
// function renderTasks() {
//   taskList.innerHTML = '';
//   tasks.forEach((task, index) => {
//     const taskItem = document.createElement('div');
//     taskItem.className = 'p-2 border border-gray-300 rounded flex justify-between items-center';
//     taskItem.innerHTML = `
//       <span> ${task.text} <span class="text-sm text-gray-500">(${task.category})</span></span>
//       <button onclick="deleteTask(${index})" class="text-red-500">Delete</button>
//     `;
//     taskList.appendChild(taskItem);
//   });
// }

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'p-2 border border-gray-300 rounded flex items-center space-x-2';

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed || false; // Set checkbox state
    checkbox.className = 'form-checkbox h-5 w-5 text-blue-600';
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskText.classList.toggle('line-through', checkbox.checked);
    });

    // Task Text
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.className = `flex-1 ${task.completed ? 'line-through' : ''}`;

    // Category Badge
    const categoryBadge = document.createElement('span');
    categoryBadge.textContent = `(${task.category})`;
    categoryBadge.className = 'text-sm text-gray-500 ';

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'text-red-500';
    deleteButton.addEventListener('click', () => deleteTask(index));

    // Append Elements
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(categoryBadge);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

// addTaskBtn.addEventListener('click', () => {
//   const text = taskInput.value.trim();
//   const category = taskCategory.value;
//   if (text) {
//     tasks.push({ text, category });
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     taskInput.value = '';
//     renderTasks();
//   }
// });


addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  const category = taskCategory.value;
  if (text) {
    tasks.push({ text, category, completed: false }); // Add completed property
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
  }
});

// function deleteTask(index) {
//   tasks.splice(index, 1);
//   localStorage.setItem('tasks', JSON.stringify(tasks));
//   renderTasks();
// }

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Heatmap Logic
function generateHeatmap() {
  heatmap.innerHTML = '';
  for (let i = 0; i < 180; i++) { // 6 months = ~180 days
    const day = document.createElement('div');
    day.className = 'h-4 w-4 bg-gray-200 rounded';
    heatmap.appendChild(day);
  }
}

// Activity Tracker Logic
function updateActivityTracker() {
  const completedTasks = tasks.filter(task => task.completed).length;
  activityTracker.innerHTML = `Completed Tasks: ${completedTasks}`;
}

// Initial Render
renderTasks();
generateHeatmap();
updateActivityTracker();