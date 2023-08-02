import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../src/scss/index.scss';

const HTMLRender = (props) => {
    const formatTime = (time) => {
        return time.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    };

    return (
        <div className='bigCounter'>
            <div className='calender'>
                <i className='far fa-clock'></i>
            </div>
            <span>Hours:</span>
            <div className='hours'>{formatTime(props.hours)}</div>
            <span>Minutes:</span>
            <div className='min'>{formatTime(props.minutes)}</div>
            <span>Seconds:</span>
            <div className='sec'>{formatTime(props.seconds)}</div>
        </div>
    );
};

const Counter = (props) => {
    const { inputGroupHours, inputGroupMinutes, inputGroupSeconds, haveSetCustomTime, resetCount, alertGroupHours, alertGroupMinutes, alertGroupSeconds, timerControl } = props;

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [alertTime, setAlertTime] = useState([null, null, null]);

    useEffect(() => {
        if (haveSetCustomTime) {
            resetCount();
            setHours(inputGroupHours);
            setMinutes(inputGroupMinutes);
            setSeconds(inputGroupSeconds);
            setAlertTime([alertGroupHours, alertGroupMinutes, alertGroupSeconds]);
        } 
        
        else {
            if (timerControl === "play") {
                const interval = setInterval(() => {
                    setSeconds((prevSeconds) => (prevSeconds + 1) % 60);

                    if (seconds === 59) {
                        setMinutes((prevMinutes) => (prevMinutes + 1) % 60);

                        if (minutes === 59) {
                            setHours((prevHours) => prevHours + 1);
                        }
                    }
                }, 1000);

                return () => {
                    clearInterval(interval);
                };
            }

            else if (timerControl === "stop") {
                // Reset the timer and set it as stopped
                setSeconds(0);
                setMinutes(0);
                setHours(0);
            }
        }

    }, [haveSetCustomTime, timerControl, inputGroupHours, inputGroupMinutes, inputGroupSeconds, alertGroupHours, alertGroupMinutes, alertGroupSeconds, seconds, minutes]);

    if (hours === alertTime[0] && minutes === alertTime[1] && seconds === alertTime[2]) {
        alert("You have reached the set time");
        setAlertTime([null, null, null]);
    }

    return <HTMLRender hours={hours} minutes={minutes} seconds={seconds} />;
};

HTMLRender.propTypes = {
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
};

export default Counter;
