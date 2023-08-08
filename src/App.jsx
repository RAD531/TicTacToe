import React, { useState } from 'react';
import { Container, Row, Col, Button, Input } from "reactstrap";
import TicTacToe from './TicTacToe.jsx';

const App = () => {

    return (
        <>
            <Container fluid className='text-center'>
                <Row className='p-4 bg-dark text-white'>
                    <h3>Tic Tac Toe Using React</h3>
                </Row>
                <Row className='row align-items-center pb-4 bg-secondary'>
                    <Col>
                        <TicTacToe></TicTacToe>
                    </Col>
                </Row>

                <Row className='p-3 bg-secondary'>
                    <Col xs="12">
                        Made with ❤️ by Ryan Daniels
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;