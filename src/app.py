from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO
import time
import threading

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

countdown_time = 1 * 60  # 30 minutes in seconds
timer_running = False
pause_flag = False


def countdown_timer():
    global countdown_time, timer_running, pause_flag
    while countdown_time > 0 and timer_running:
        if not pause_flag:
            minutes, seconds = divmod(countdown_time, 60)
            time_str = "{:02}:{:02}".format(minutes, seconds)
            socketio.emit('update_timer', {'time': time_str}, namespace='/countdown')
            time.sleep(1)
            countdown_time -= 1
        else:
            time.sleep(1)

    if timer_running:
        socketio.emit('timer_expired', namespace='/countdown')


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('start_timer', namespace='/countdown')
def start_timer():
    global countdown_time, timer_running, pause_flag
    if not timer_running:
        timer_running = True
        pause_flag = False
        countdown_thread = threading.Thread(target=countdown_timer)
        countdown_thread.start()
    else:
        pause_flag = not pause_flag

if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
