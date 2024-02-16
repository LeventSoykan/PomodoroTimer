let interval;
let paused = false;

self.onmessage = function (e) {
    if (e.data === 'pause') {
        console.log('pause called')
        clearInterval(interval);
        paused = true;
    } else {
        let [minutes, seconds] = e.data;
        function countdown() {
            interval = setInterval(function () {
                    if (seconds === 0) {
                        if (minutes === 0) {
                            clearInterval(interval);
                        } else {
                            minutes--;
                            seconds = 59;
                        }
                    } else {
                        seconds--;
                    }
                    self.postMessage([minutes, seconds]);
                }, 1000);
        }
        if (!(minutes === 0 && seconds === 0)) {
                        countdown();
                    }
    }
};
