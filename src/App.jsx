import React from 'react';
import { Container, Row, Col } from "reactstrap";
import SimpleCounter from './SimpleCounter';

const App = () => {
    return (
        <>
            <Container fluid>
                <Row className='row align-items-center min-vh-100'>
                    <Col className='p-0'>
                        <SimpleCounter></SimpleCounter>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;