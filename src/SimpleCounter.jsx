import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input } from "reactstrap";
import Counter from './Counter.jsx';

const SimpleCounter = (props) => {

    // State variables to hold the values from the child component

    //input group
    const [inputGroupHours, setInputGroupHours] = useState(0);
    const [inputGroupMinutes, setInputGroupMinutes] = useState(0);
    const [inputGroupSeconds, setInputGroupSeconds] = useState(0);

    //alert group
    const [alertGroupHours, setAlertGroupHours] = useState(0);
    const [alertGroupMinutes, setAlertGroupMinutes] = useState(0);
    const [alertGroupSeconds, setAlertGroupSeconds] = useState(0);

    //countdown control
    const [timerControl, setTimerControl] = useState("play");

    //has custom time been set
    const [haveSetCustomTime, setCustomTime] = useState(false);

    //handle the custom time and alert validation
    const handleButtonClick = () => {

        if (
            checkValidEntry(inputGroupHours, 0, 24, "number") && 
            checkValidEntry(inputGroupMinutes, 0, 59, "number") && 
            checkValidEntry(inputGroupSeconds, 0, 59, "number") &&
            checkValidEntry(alertGroupHours, 0, 24, "number") && 
            checkValidEntry(alertGroupMinutes, 0, 59, "number") && 
            checkValidEntry(alertGroupSeconds, 0, 59, "number"))
            {
                //set to true to trigger in counter child
                setCustomTime(true);
            }
        
        else{
            alert("Your times are incorrect format");
        }
    };

    //check inputs are within times
    const checkValidEntry = (value, greaterOrEqualTo, lessOrEqualTo, dataType) => {
        let result = false;
        return result = typeof value === dataType && value >= greaterOrEqualTo && value <= lessOrEqualTo ? true : false;
    }

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
            <Row className='p-3 text-center'>
                <Col md="6">
                    <Row>
                        <h5 className='pt-2 pb-2'>Change the time</h5>
                        <Col md="4">
                            <div className="form-floating">
                                <Input onChange={(e) => setInputGroupHours(parseInt(e.target.value, 10))} value={inputGroupHours} placeholder="0" min="0" max="23" className="form-control" type="number" />
                            </div>
                        </Col>

                        <Col md="4">
                            <div className="form-floating">
                                <Input onChange={(e) => setInputGroupMinutes(parseInt(e.target.value, 10))} value={inputGroupMinutes} placeholder="0" min="0" max="59" className="form-control" type="number" />
                            </div>
                        </Col>

                        <Col md="4">
                            <div className="form-floating">
                                <Input onChange={(e) => setInputGroupSeconds(parseInt(e.target.value, 10))} value={inputGroupSeconds} placeholder="0" min="0" max="59" className="form-control" type="number" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <h5 className='pt-2 pb-2'>Set alert time</h5>
                        <Col md="4">
                            <div className="form-floating">
                                <Input onChange={(e) => setAlertGroupHours(parseInt(e.target.value, 10))} value={alertGroupHours} placeholder="0" min="0" max="23" className="form-control" type="number" />
                            </div>
                        </Col>

                        <Col md="4">
                            <div className="form-floating">
                                <Input onChange={(e) => setAlertGroupMinutes(parseInt(e.target.value, 10))} value={alertGroupMinutes} placeholder="0" min="0" max="59" className="form-control" type="number" />
                            </div>
                        </Col>

                        <Col md="4">
                            <div className="form-floating">
                                <Input onChange={(e) => setAlertGroupSeconds(parseInt(e.target.value, 10))} value={alertGroupSeconds} placeholder="0" min="0" max="59" className="form-control" type="number" />
                            </div>
                        </Col>
                    </Row>

                    <Row className='pt-4'>
                        <Col md="12">
                            <Button color="success" onClick={handleButtonClick}>Submit Time and Alert</Button>
                        </Col>
                    </Row>
                </Col>

                <Col md="6">
                    <Row>
                        <Col md="4" className='p-0'>
                            <Button color="primary" onClick={() => setTimerControl("play")}>Play</Button>
                        </Col>
                        <Col md="4" className='p-0'>
                            <Button color="warning" onClick={() => setTimerControl("pause")}>Pause</Button>
                        </Col>
                        <Col md="4" className='p-0'>
                            <Button color="danger" onClick={() => setTimerControl("stop")}>Stop</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default SimpleCounter;