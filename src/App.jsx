import React from 'react';
import { Container, Row, Col } from "reactstrap";
import SimpleCounter from './SimpleCounter';

const App = () => {
    return (
        <>
            <Container fluid>
                <Row className='row align-items-center'>
                    <Col>
                        <SimpleCounter></SimpleCounter>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;