let startingMinutes = 25
let time = startingMinutes * 60
let isRunning = false
let clock;
let short_duration = 5;
let long_duration = 15;
let pomodoro_duration = 25;

const countdownEl = document.getElementById('countdown')
const counterButton  = document.getElementById('start')
const long_input = document.getElementById('long')
const pomodoro_input = document.getElementById('pomodoro')
const short_input = document.getElementById('short')
const form = document.getElementById('form')
const periodSelect = document.getElementById('period-selection');

function update_timer() {
    const minutes = Math.floor((time / 60));
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}: ${seconds}`;
}

update_timer()

function updateCountDown() {
    if (time>0) {
        isRunning = true;
        counterButton.innerHTML = 'Pause'
        time--;
        update_timer()
    } else {
        isRunning = false;
        counterButton.innerHTML = 'Start'
        clearInterval(clock)
        time = startingMinutes * 60
        update_timer()
    }
}

function start() {
    if (isRunning) {
        clearInterval(clock);
        isRunning = false;
        counterButton.innerHTML = 'Resume'
    } else {
        clock = setInterval(updateCountDown, 1000);
    }
}

function period(element) {
    switch (element.innerHTML) {
        case 'Short Break':
            startingMinutes = short_duration;
            break;
        case 'Long Break':
            startingMinutes = long_duration
            break;
        case 'Pomodoro':
            startingMinutes = pomodoro_duration
            break;
    }
    time = startingMinutes*60
    isRunning = false;
    update_timer()
    clearInterval(clock)
    counterButton.innerHTML = 'Start'
}

function select(selection, box) {
    if (selection > 60) {
        alert('Please select a value below 60 minutes')
    } else {

    }
}

function settings() {
    document.getElementById("myDialog").open = true;
}

function closeDialog() {
    document.getElementById("myDialog").open = false;
}

function save_settings() {
    pomodoro_duration = pomodoro_input.innerHTML
    short_duration = pomodoro_input.innerHTML
    long_duration = pomodoro_input.innerHTML
    console.log(pomodoro_duration)
    // closeDialog()
}


form.addEventListener("submit", function(e) {
  e.preventDefault();
  const data = new FormData(form);
  pomodoro_duration = data.get('pomodoro');
  long_duration = data.get('long');
  short_duration = data.get('short');
  console.log(short_duration)
})

periodSelect.addEventListener('click',  ({target}) => {
    period(target)
})
