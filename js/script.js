class Stopwatch extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
        
    }
    
    reset() {
        this.setState({
            running: false,
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        })
    }
    
    print() {
        const {minutes: mm, seconds: ss, miliseconds: ms} = this.state;
        return `${mm}:${ss}:${ms}`;
    }
    
    /*format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }*/
    
    start() {
        if (!this.running) {
            this.setState({
                running: true
            })
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    
    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }
    
    calculate() {
        this.state.miliseconds += 1;
        if (this.state.miliseconds >= 100) {
            this.state.seconds += 1;
            this.state.miliseconds = 0;
        }
        if (this.state.seconds >= 60) {
            this.state.minutes += 1;
            this.state.seconds = 0;
        }
    }
    
    stop() {
        this.setState({
            running: false
        })
        clearInterval(this.watch);
    }
    
    restart() {
        this.setState({
            running: false
        })
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

/*
function pad0(value) {
    let result = value.toString();
    if (result.length > 2) {
        result = '0' + result;
    }
    return result;
}
*/

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
