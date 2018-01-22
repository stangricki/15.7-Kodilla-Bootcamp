class Stopwatch extends React.Component {
  render() {
    return (
    <div className="container">
      <nav className="controls">
        <button className="button start" onClick={e => this.start()}><i className="fa fa-play" aria-hidden="true"></i> Start</button>
        <button className="button stop" onClick={e => this.stop()}><i className="fa fa-pause" aria-hidden="true" ></i> Pause</button>
        <button className="button reset" onClick={e => this.reset()}><i className="fa fa-stop" aria-hidden="true"></i> Reset</button>
      </nav>
      <div className="stopwatch">
       {this.state.display}
      </div>
      <button className="button save" 
      
      onClick={ 
        function(e) {
          this.container.querySelector('.results').innerHTML += `<li>${this.display.textContent}</li>`;
        } 
      }

      >

      <i className="fa fa-plus" aria-hidden="true"></i> Save Result</button>
      <button className="button delete" onClick={e => this.delete()}><i className="fa fa-trash" aria-hidden="true"></i> Delete Results</button>
      <ul className="results">
      </ul>
    </div>);
  }
  
  constructor() {
    super()
    this.running = false;
    this.reset();
    this.state = {
      display: ''
    }
  }
  
  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.print();
    this.stop();
  }
  
  print() {
    this.setState({
      display: this.format(this.times)
    })
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

  stop() {
    this.running = false;
    clearInterval(this.watch);
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
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

class App extends React.Component {
    render() {
        return (
          <div>
            <Stopwatch />
          </div>
        )
    }
};

const app = <App />;
ReactDOM.render(app, document.getElementById('app'));