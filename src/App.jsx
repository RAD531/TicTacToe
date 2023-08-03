import React, { useState } from 'react';
import { Container, Row, Col, Button, Input } from "reactstrap";
import TrafficLight from './TrafficLight';

const App = () => {

    const [addedColor, setAddedColor] = useState("");
    const [inputColor, setInputColor] = useState("");
    const [cycle, setCycle] = useState(false);

    return (
        <>
            <Container fluid className='text-center'>
                <Row className='p-4 bg-dark text-white'>
                    <h3>Traffic Light Using React</h3>
                </Row>
                <Row className='row align-items-center pt-4 pb-4'>
                    <Col>
                        <TrafficLight addedColor={addedColor} setAddedColor={() => setAddedColor("")} cycle={cycle}></TrafficLight>
                    </Col>
                </Row>
                <Row className='p-4 bg-dark text-white'>
                    <Col>
                        <Row>
                            <Col md="6">
                                <div className="form-floating">
                                    <Input onChange={(e) => setInputColor(e.target.value)} value={inputColor} placeholder="blue" min="1" max="20" className="form-control" type="text" />
                                </div>
                            </Col>

                            <Col md="6">
                                <Button onClick={() => setAddedColor(inputColor)} color="primary">Add Color</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Button onClick={(event) => { setCycle(!cycle); event.target.innerText = event.target.innerText === 'Cycle Through Lights' ? 'Do Not Cycle' : 'Cycle Through Lights'; }}>Cycle Through Lights</Button>
                    </Col>
                </Row>

                <Row className='p-3'>
                    <Col xs="12">
                        Made with ❤️ by Ryan Daniels
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;