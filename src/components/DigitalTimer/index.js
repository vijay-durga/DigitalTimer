import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timer: 25,
    minutes: 25,
    seconds: '00',
  }

  onStartOrPauseTimer = () => {
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    this.timerID = setInterval(() => {
      const {seconds, minutes} = this.state
      let resultantSeconds = minutes * 60 + parseInt(seconds)
      resultantSeconds -= 1
      this.setState({
        seconds: resultantSeconds % 60,
        minutes: Math.floor(resultantSeconds / 60),
      })
    }, 1000)
  }

  onResetTimer = () => {
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
      minutes: 25,
      seconds: '00',
    }))
    clearInterval(this.timerID)
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timer: prevState.timer + 1,
      minutes: parseInt(prevState.minutes) + 1,
    }))
  }

  onDecrement = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      this.setState(prevState => ({
        timer: prevState.timer,
      }))
    } else {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
        minutes: parseInt(prevState.minutes) - 1,
      }))
    }
  }

  render() {
    const {isTimerRunning, minutes, timer, seconds} = this.state
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const timerText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <div className="digitalTimer-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="container">
            <div className="runningTimer-container">
              <div className="time-container">
                <h1 className="running-time">
                  {minutes}:{seconds}
                </h1>
                <p className="description">{timerText}</p>
              </div>
            </div>
            <div className="container2">
              <div className="timer-controller-container">
                <button
                  className="timer-controller-btn"
                  onClick={this.onStartOrPauseTimer}
                  type="button"
                >
                  <img
                    alt={startOrPauseAltText}
                    className="timer-controller-icon"
                    src={startOrPauseImageUrl}
                  />
                  <p className="timer-controller-label">
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </p>
                </button>
                <button
                  className="timer-controller-btn"
                  onClick={this.onResetTimer}
                  type="button"
                >
                  <img
                    alt="reset icon"
                    className="timer-controller-icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                  <p className="timer-controller-label">Reset</p>
                </button>
              </div>
              <p className="about">Set Timer Limit</p>
              <div className="container3">
                <button
                  className="sign-button"
                  type="button"
                  onClick={this.onDecrement}
                >
                  -
                </button>
                <div className="time-setter-container">
                  <p className="time-setter">{timer}</p>
                </div>
                <button
                  className="sign-button"
                  type="button"
                  onClick={this.onIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
