class App extends React.Component {
    render() {
        return (
            <div class="container container__stopwatch--first">
      <nav class="controls">
        <button href="#" class="button start" id="start"><i class="fa fa-play" aria-hidden="true"></i> Start</button>
        <button href="#" class="button stop"  id="stop"> <i class="fa fa-pause" aria-hidden="true"></i> Pause</button>
        <button href="#" class="button reset" id="reset"><i class="fa fa-stop" aria-hidden="true"></i> Reset</button>
      </nav>
      <div class="stopwatch"></div>
      <button href="#" class="button save" id="save"><i class="fa fa-plus" aria-hidden="true"></i> Save Result</button>
      <button href="#" class="button delete" id="delete"><i class="fa fa-trash" aria-hidden="true"></i> Delete Results</button>
      <ul class="results">
      </ul>
    </div>
        )
    }
};

const app = <App />;
ReactDOM.render(app, document.getElementById('app'));

class Stopwatch extends React.Component {
  constructor(container) {
    super();

    this.container = container
    this.running = false;
    this.display = this.container.querySelector('.stopwatch');
    this.reset();
    this.print(this.times);
    this.build(this.container)
  }
  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }
  print() {
    this.display.innerText = this.format(this.times);
  }
  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }
  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }
  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }
  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  build(container) {

    // NA POTEM: wrzucic to w obiekt piekniutki
    // const setup = {
    //     'start': () => {},
    //     'stop': () =>
    // }

    // Object.keys(setup).forEach()

    const startButton = container.getElementsByClassName('start');
    startButton[0].addEventListener('click', () => this.start());

    const stopButton = container.getElementsByClassName('stop');
    stopButton[0].addEventListener('click', () => {
      this.stop();
    });

    const resetButton = container.getElementsByClassName('reset');
    resetButton[0].addEventListener('click', () => {
      this.reset();
      this.print();
      this.stop();
    });

    const saveButton = container.getElementsByClassName('save');
    saveButton[0].addEventListener('click', () => {
      this.container.querySelector('.results').innerHTML += `<li>${this.display.textContent}</li>`;
    }); 

    // delete BUTTON

    const deleteButton = this.container.getElementsByClassName('delete');
    deleteButton[0].addEventListener('click', () => {
      this.container.querySelector('.results').innerHTML = " ";
    }); 
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

['.container__stopwatch--first', '.container__stopwatch--second'].forEach((selector) => {
    new Stopwatch(document.querySelector(selector))
})

