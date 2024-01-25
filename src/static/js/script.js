const startingMinutes = 10
let time = startingMinutes * 60
let isRunning = false
let clock;

const countdownEl = document.getElementById('countdown')

function update_timer() {
    const minutes = Math.floor((time / 60));
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}: ${seconds}`;
}

function updateCountDown() {
    if (time>0) {
        isRunning = true;
        time--;
        update_timer()
    } else {
        isRunning = false;
        clearInterval(clock)
        time = startingMinutes * 60
        update_timer()
    }
}

function start() {
    if (isRunning) {
        clearInterval(clock);
        isRunning = false;
    } else {
        clock = setInterval(updateCountDown, 1000);
    }
}

