class DayConductor {
    constructor() {
        this.HOUR_HEIGHT = 120;
        this.form = document.getElementById('task-form');
        this.init();
    }

    init() {
        this.createHourLabels();
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleTaskAdd();
        });
    }

    createHourLabels() {
        const axis = document.getElementById('hour-axis');
        for (let i = 0; i < 24; i++) {
            const label = document.createElement('div');
            label.className = 'hour-label';
            label.innerText = `${i}:00`;
            axis.appendChild(label);
        }
    }

    handleTaskAdd() {
        const name = document.getElementById('task-name').value;
        const lane = document.getElementById('task-lane').value;
        const start = document.getElementById('start-time').value;
        const end = document.getElementById('end-time').value;

        this.renderTask({ name, lane, start, end });
        this.form.reset();
    }

    timeToPx(timeStr) {
        const [h, m] = timeStr.split(':').map(Number);
        return (h * this.HOUR_HEIGHT) + (m * (this.HOUR_HEIGHT / 60));
    }

    renderTask(task) {
        const startPx = this.timeToPx(task.start);
        const endPx = this.timeToPx(task.end);
        const height = endPx - startPx;

        // 指定されたレーンのサーフェスを選択
        const surface = document.getElementById(`surface-${task.lane}`);

        const card = document.createElement('div');
        card.className = `task-card ${task.lane}`;
        card.style.top = `${startPx}px`;
        card.style.height = `${height}px`;

        card.innerHTML = `
            <div class="task-name">${task.name}</div>
            <div class="task-info">${task.start} - ${task.end}</div>
        `;

        surface.appendChild(card);
    }
}

const app = new DayConductor();
