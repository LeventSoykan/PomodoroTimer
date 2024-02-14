let startingMinutes = 25;
let time = startingMinutes * 60;
let isRunning = false;
let clock;
let short_duration = 5;
let long_duration = 15;
let pomodoro_duration = 25;
let selected = 'Pomodoro Timer';

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
    const minutes = Math.floor((time / 60));
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    title.innerHTML = `${minutes}:${seconds} - ${selected}`

    if (time === 0) {
        alarmSound.play();
    }
}

function updateCountDown() {
    if (time > 0) {
        isRunning = true;
        counterButton.innerHTML = 'Pause';
        time--;
        update_timer();
    } else {
        isRunning = false;
        counterButton.innerHTML = 'Start';
        clearInterval(clock);
        time = startingMinutes * 60;
        update_timer();
    }
}

function start() {
    if (isRunning) {
        clearInterval(clock);
        isRunning = false;
        counterButton.innerHTML = 'Resume';
    } else {
        clock = setInterval(updateCountDown, 1000);
    }
}

function period(element) {
    selected = element.innerHTML;
    switch (element.innerHTML) {
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
    clearInterval(clock);
    counterButton.innerHTML = 'Start';
    title.innerHTML = 'Pomodoro Timer';
}

document.getElementById('settings').addEventListener('click', function () {
    $('#myDialog').modal();
})

function updateSettingsModal() {
    document.getElementById('short').value = short_duration;
    document.getElementById('pomodoro').value = pomodoro_duration;
    document.getElementById('long').value = long_duration;
}

function save_settings() {
    pomodoro_duration = parseInt(pomodoro_input.value);
    short_duration = parseInt(short_input.value);
    long_duration = parseInt(long_input.value);
    console.log(pomodoro_duration);
    updateSettingsModal();
    $('#myDialog').modal('hide');
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    save_settings();
});
