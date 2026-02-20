const taskForm = document.getElementById('task-form');
const taskLayer = document.getElementById('task-layer');
const timeMarksContainer = document.getElementById('time-marks');

const HOUR_HEIGHT = 100; // CSSの --hour-height と合わせる

// 1. 背景の目盛りを生成 (0:00 - 23:00)
function createTimeMarks() {
    for (let i = 0; i < 24; i++) {
        const mark = document.createElement('div');
        mark.className = 'time-mark';
        mark.innerText = `${i}:00`;
        timeMarksContainer.appendChild(mark);
    }
}

// 2. 時間(HH:mm)を上からの位置(px)に変換する関数
function timeToPx(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * HOUR_HEIGHT) + (minutes * (HOUR_HEIGHT / 60));
}

// 3. タスクを画面に描画
function renderTask(task) {
    const startPx = timeToPx(task.start);
    const endPx = timeToPx(task.end);
    const durationHeight = endPx - startPx;

    const taskEl = document.createElement('div');
    taskEl.className = 'task-card';
    taskEl.style.top = `${startPx}px`;
    taskEl.style.height = `${durationHeight}px`;

    taskEl.innerHTML = `
        <div class="task-title">
            <span>${task.name}</span>
            <span class="task-time-range">${task.start}-${task.end}</span>
        </div>
        <div class="task-cat">${task.category}</div>
    `;
    
    taskLayer.appendChild(taskEl);
}

// 4. フォーム送信時の処理
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTask = {
        name: document.getElementById('task-name').value,
        category: document.getElementById('task-category').value,
        start: document.getElementById('start-time').value,
        end: document.getElementById('end-time').value
    };

    renderTask(newTask);
    taskForm.reset();
});

// 初期化
createTimeMarks();
