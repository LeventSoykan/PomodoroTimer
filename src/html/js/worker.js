self.addEventListener('message', function(e) {
  if(e.data === 'run the timer') {
    let count = 0;

    setInterval(_ => {
      count+=10;

      let ms = count % 1000;
      let s = Math.floor((count /  1000)) % 60;
      let m = Math.floor((count / 60000)) % 60;

      let time = m + ":" + s + ":" + ms;

      self.postMessage(time);
    }, 10);
  } else if(e.data === 'hang the browser') {
    let val = "";

    for (let i = 0; i < 10000; i++) {
      for (let j = 0; j < 10000; j++) {
        val = "Worker returned: " + i + j;
      }
    }

    self.postMessage(val);
  }
});