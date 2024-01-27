const startingMinutes = 10
let time = startingMinutes * 60
let isRunning = false
let clock;

const countdownEl = document.getElementById('countdown')
const counterButton  = document.getElementById('start')

function update_timer() {
    const minutes = Math.floor((time / 60));
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}: ${seconds}`;
}

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

function period(selected_time) {
    time = selected_time*60
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


