import bellSound from "../assets/1.mp3"

class PomodoroTimer {
    constructor(workTime, breakTime) {
        this.workTime = workTime * 60; // Преобразуем минуты в секунды
        this.breakTime = breakTime * 60;
        this.timeLeft = this.workTime;
        this.isWorkSession = true;
        this.isRunning = false;
        this.timer = null;
        this.audio = new Audio(bellSound);
    }


    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timer = setInterval(() => this.tick(), 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.timer);
            this.isRunning = false;
        }
    }

    reset() {
        this.pause();
        this.timeLeft = this.isWorkSession ? this.workTime : this.breakTime;
        this.updateDisplay();
    }

    tick() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateDisplay();
        } else {
            this.switchSession();
        }
    }

    switchSession() {
        this.audio.play(); // Оповещение
        this.isWorkSession = !this.isWorkSession;
        message.textContent = this.isWorkSession ? 'Time to focus!' : 'Time for a break!';
        this.timeLeft = this.isWorkSession ? this.workTime : this.breakTime;
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        document.querySelector(".mins").textContent = minutes;
        document.querySelector(".secs").textContent = seconds < 10 ? `0${seconds}` : seconds;
    }
}

// Пример использования
const focusInput = document.getElementById("focusTime");
const breakInput = document.getElementById("breakTime");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const message = document.querySelector(".timer-message");

let pomodoro = new PomodoroTimer(parseInt(focusInput.value), parseInt(breakInput.value));
pomodoro.updateDisplay();

startBtn.addEventListener("click", () => pomodoro.start());
pauseBtn.addEventListener("click", () => pomodoro.pause());
resetBtn.addEventListener("click", () => pomodoro.reset());

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    pomodoro = new PomodoroTimer(parseInt(focusInput.value), parseInt(breakInput.value));
    pomodoro.updateDisplay();
});
