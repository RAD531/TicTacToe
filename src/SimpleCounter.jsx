import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from "reactstrap";
import Counter from './Counter.jsx';
import CountdownInputGroup from './CountdownInputGroup.jsx';

const SimpleCounter = (props) => {

    // State variables to hold the values from the child component
    const [inputGroupHours, setInputGroupHours] = useState(0);
    const [inputGroupMinutes, setInputGroupMinutes] = useState(0);
    const [inputGroupSeconds, setInputGroupSeconds] = useState(0);

    const [alertGroupHours, setAlertGroupHours] = useState(0);
    const [alertGroupMinutes, setAlertGroupMinutes] = useState(0);
    const [alertGroupSeconds, setAlertGroupSeconds] = useState(0);

    const [timerControl, setTimerControl] = useState("play");

    const [haveSetCustomTime, setCustomTime] = useState(false);

    const handleButtonClick = () => {
        // Check if input values are valid numbers
        if (
            typeof inputGroupHours === "number" &&
            typeof inputGroupMinutes === "number" &&
            typeof inputGroupSeconds === "number" &&
            inputGroupHours >= 0 &&
            inputGroupHours <= 24 &&
            inputGroupMinutes >= 0 &&
            inputGroupMinutes <= 59 &&
            inputGroupSeconds >= 0 &&
            inputGroupSeconds <= 59
        ) {
            setCustomTime(true);
        }
    };

    return (
        <>
            <Row>
                <Counter
                    inputGroupHours={inputGroupHours}
                    inputGroupMinutes={inputGroupMinutes}
                    inputGroupSeconds={inputGroupSeconds}
                    haveSetCustomTime={haveSetCustomTime}
                    resetCount={() => setCustomTime(false)}
                    alertGroupHours={alertGroupHours}
                    alertGroupMinutes={alertGroupMinutes}
                    alertGroupSeconds={alertGroupSeconds}
                    timerControl={timerControl}
                />
            </Row>
            <Row>
                <Col>
                    <CountdownInputGroup
                        inputGroupHours={inputGroupHours}
                        inputGroupMinutes={inputGroupMinutes}
                        inputGroupSeconds={inputGroupSeconds}
                        setHours={setInputGroupHours}
                        setMinutes={setInputGroupMinutes}
                        setSeconds={setInputGroupSeconds}
                    />
                    <Col>
                        <CountdownInputGroup
                            inputGroupHours={alertGroupHours}
                            inputGroupMinutes={alertGroupMinutes}
                            inputGroupSeconds={alertGroupSeconds}
                            setHours={setAlertGroupHours}
                            setMinutes={setAlertGroupMinutes}
                            setSeconds={setAlertGroupSeconds}
                        />
                    </Col>

                    <Col>
                        <Button onClick={handleButtonClick}></Button>
                    </Col>
                </Col>

                <Col>
                    <Button onClick={() => setTimerControl("play")}>Play</Button>
                    <Button onClick={() => setTimerControl("pause")}>Pause</Button>
                    <Button onClick={() => setTimerControl("stop")}>Stop</Button>
                </Col>
            </Row>
        </>
    );
};

export default SimpleCounter;