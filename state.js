const heatmap = document.getElementById('heatmap');
const activityTracker = document.getElementById('activityTracker');
const today = new Date();
const startDate = new Date(today.setMonth(today.getMonth() - 6));

function generateHeatmap() {
  heatmap.innerHTML = '';
  for (let i = 0; i < 180; i++) { // 6 months = ~180 days
    const day = document.createElement('div');
    day.className = 'h-4 w-4 bg-gray-200 rounded';
    heatmap.appendChild(day);
  }
}

function updateActivityTracker() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const completedTasks = tasks.filter(task => task.completed).length;
  activityTracker.innerHTML = `Completed Tasks: ${completedTasks}`;
}

generateHeatmap();
updateActivityTracker();