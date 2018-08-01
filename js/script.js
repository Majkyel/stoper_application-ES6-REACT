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
    
    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            })
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    
    step() {
        if (!this.state.running) return;
        this.calculate();
    }
    
    calculate() {
        let {minutes: mm, seconds: ss, miliseconds: ms} = this.state;
        
        ms += 1;
        if (ms >= 100) {
            ss += 1;
            ms = 0;
        }
        if (ss >= 60) {
            mm += 1;
            ss = 0;
        }
        
        this.setState({
            minutes: mm,
            seconds: ss,
            miliseconds: ms,
        })
    }
    
    stop() {
        this.setState({
            running: false
        })
        clearInterval(this.watch);
    }
    
    restart() {
        this.reset();
    }
    
    render() {
        return React.createElement('div', {className: 'container'},
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

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
ReactDOM.render(element, document.getElementById('app_second'));
