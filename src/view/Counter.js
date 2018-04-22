import React from 'react';
import './Counter.scss';

class Counter extends React.Component {
  state = {
    seconds: 0,
  }

  componentDidMount() {
    this.beginFrom();
    this.start();
  }

  componentDidUpdate() {
    this.finishAt();
  }

  start = () => {
    this.counter = setInterval(() => this.calculate(), 1000);
  }

  stop = () => {
    clearInterval(this.counter);
  }

  reset = () => {
    this.setState({
      seconds: 0,
    });
  }

  restart = (e) => {
    e.preventDefault();
    this.stop();
    this.reset();
    this.beginFrom();
    this.start();
    console.log('Lol');
  }

  calculate = () => {
    let seconds = this.state.seconds;
    seconds += 1;
    this.setState({ seconds });
  }

  beginFrom = () => {
    const beginning = this.props.from;
    this.setState({ seconds: beginning });
  }

  finishAt = () => {
    const stopAt = this.props.to;
    if (this.state.seconds >= stopAt) { 
      this.stop();
      this.onSuccess();
    }
  }

  onSuccess = () => {
    (this.props.onSuccess) ? this.props.onSuccess() : console.log('Nie zdefiniowano komunikatu');
  }

  format = () => {
    const minutesToFormat = Math.floor(this.state.seconds / 60);
    const secondsToFormat = this.state.seconds % 60;
    return `${this.pad0(minutesToFormat)}:${this.pad0(secondsToFormat)}`;
  }

  pad0 = (value) => {
    let result = value.toString();
    if (result.length < 2) {
      result = `0${result}`;
    }
    return result;
  }

  render() {
    return (
      <p onClick={ this.restart } className='Counter'>{this.format()}</p>
    )
  }
}

export default Counter;