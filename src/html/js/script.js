let startingMinutes = 25;
let time = startingMinutes * 60;
let isRunning = false;
let short_duration = 5;
let long_duration = 15;
let pomodoro_duration = 25;
let selected = 'Pomodoro';
const clock = new Worker('js/timer_worker.js');

const countdownEl = document.getElementById('countdown');
const counterButton = document.getElementById('start');
const long_input = document.getElementById('long');
const pomodoro_input = document.getElementById('pomodoro');
const short_input = document.getElementById('short');
const form = document.getElementById('form');
const alarmSound = new Audio('static/alarm.mp3'); // Path to your alarm sound file
const title = document.getElementById('title');

update_timer();
updateSettingsModal();

function update_timer() {
    let minutes = Math.floor((time / 60));
    let seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    title.innerHTML = `${minutes}:${seconds} - ${selected}`
}

function start() {
    if (isRunning) {
        clock.postMessage("pause");
        isRunning = false;
        counterButton.innerHTML = 'Resume';
        update_timer()
    } else {
        const minutes = Math.floor((time / 60));
        let seconds = time % 60;
        isRunning = true;
        counterButton.innerHTML = 'Pause';

        clock.postMessage([minutes, seconds]);

        clock.onmessage = function (e) {
            let [minutes, seconds] = e.data;
            time = minutes*60 + seconds
            if (time===0) {
                counterButton.innerHTML = 'Start';
                time = startingMinutes * 60;
                alarmSound.play()
                title.innerHTML = `${selected}`;
                isRunning = false;
            }
            update_timer()
        };
    }
}

function period(element) {
    selected = element.innerHTML;
    applySelected(selected)
}

function applySelected(selected) {
    switch (selected) {
        case 'Short Break':
            startingMinutes = short_duration;
            break;
        case 'Long Break':
            startingMinutes = long_duration;
            break;
        case 'Pomodoro':
            startingMinutes = pomodoro_duration;
            break;
    }
    time = startingMinutes * 60;
    isRunning = false;
    update_timer();
    clock.postMessage("pause");
    counterButton.innerHTML = 'Start';
    title.innerHTML = `${selected}`;
}

document.getElementById('settings').addEventListener('click', function () {
    $('#myDialog').modal();
})

function updateSettingsModal() {
    document.getElementById('short').value = short_duration;
    document.getElementById('pomodoro').value = pomodoro_duration;
    document.getElementById('long').value = long_duration;
    applySelected(selected)
}

function save_settings() {
    pomodoro_duration = parseInt(pomodoro_input.value);
    short_duration = parseInt(short_input.value);
    long_duration = parseInt(long_input.value);
    updateSettingsModal();
    $('#myDialog').modal('hide');
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    save_settings();
});