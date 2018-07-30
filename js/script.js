class Stopwatch extends React.Component {
    
    constructor(display) {
        super();
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
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
    
    restart() {
        this.running = false;
        this.reset();
        this.print();
    }
    
    render() {
        return React.createElement('div', {},
            React.createElement('h1', {className: 'header'}, 'STOPER'),
            React.createElement('div', {className: 'controls'},
                React.createElement('button', {className: 'button', onClick: () => this.start()}, 'START'),                   
                React.createElement('button', {className: 'button', onClick: () => this.stop()}, 'STOP'),                   
                React.createElement('button', {className: 'button', onClick: () => this.restart()}, 'RESTART'),                  
            ),
            React.createElement('div', {className: 'stopwatch'}, this.print()),
        ) 
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length > 2) {
        result = '0' + result;
    }
    return result;
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
