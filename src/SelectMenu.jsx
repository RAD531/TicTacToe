import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import './css/selectMenu.css';

let AiPlaying = false;

export default class SelectMenu extends Component {

    setPlayerOneOnChange(newName) {
        this.props.setPlayerOneName(newName);
    }

    setPlayerTwoOnChange(newName) {
        this.props.setPlayerTwoName(newName);
    }

    setGameStartOnClickPlayerOne() {
        if (AiPlaying) {
            this.props.setPlayerTwoHuman(false);
            this.props.setPlayerOneHuman(true);
            this.props.setMinPlayer('o');
            this.props.setMaxPlayer('x');

            let player = { name: this.props.playerOneValue.name, symbol: 'x', human: true };
            this.props.setTurn(player, () => {
                this.props.setGameStart(true);
                return;
            });
        }

        else {
            this.props.setPlayerOneHuman(true);
            this.props.setPlayerTwoHuman(true);
            let player = { name: this.props.playerOneValue.name, symbol: 'x', human: true };
            this.props.setTurn(player);
            this.props.setGameStart(true);
            return;
        }
    }

    setGameStartOnClickPlayerTwo() {
        if (AiPlaying) {
            this.props.setPlayerOneHuman(false);
            this.props.setPlayerTwoHuman(true);
            this.props.setMinPlayer('x');
            this.props.setMaxPlayer('o');

            let player = { name: this.props.playerOneValue.name, symbol: 'x', human: false};
            this.props.setTurn(player, () => {
                this.props.setGameStart(true);
                this.props.gameLoop();
                return;
            });
        }

        else {
            this.props.setPlayerOneHuman(true);
            this.props.setPlayerTwoHuman(true);

            let player = { name: this.props.playerTwoValue.name, symbol: 'o', human: true };
            this.props.setTurn(player);
            this.props.setGameStart(true);
            return;
        }
    }

    setAgainstAIOnChange(e) {
        AiPlaying = e;
        this.props.setAgainstAI(e);
    }

    render() {
        return (
            <Row className="p-3">
                <Col>
                    <Row className="p-2">
                        <h5>Choose Your Weapon</h5>
                    </Row>
                    <Row className="p-2 align-items-center">
                        <Col sm="5">
                            <Row className="p-3">
                                <Col>
                                    <div className="form-floating">
                                        <Input onChange={(e) => this.setPlayerOneOnChange(e.target.value)} placeholder="Enter Player 1 Name" min="1" max="20" className="form-control" type="text" />
                                        <label className="text-dark" htmlFor="floatingInput">Enter Player 1 Name</label>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <h1 onClick={() => this.setGameStartOnClickPlayerOne()} className="bg-dark text-warning w-25 mx-auto heading">X</h1>
                                </Col>
                            </Row>
                        </Col>

                        <Col sm="2">
                            <Row className="pt-5">
                                <FormGroup switch>
                                    <Input onChange={e => this.setAgainstAIOnChange(e.target.checked)} type="switch" role="switch" />
                                    <Label check>Against AI?</Label>
                                </FormGroup>
                            </Row>
                        </Col>

                        <Col sm="5">
                            <Row className="p-3">
                                <Col>
                                    <div className="form-floating">
                                        <Input onChange={(e) => this.setPlayerTwoOnChange(e.target.value)} placeholder="Enter Player 1 Name" min="1" max="20" className="form-control" type="text" />
                                        <label className="text-dark" htmlFor="floatingInput">Enter Player 2 Name</label>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h1 onClick={() => this.setGameStartOnClickPlayerTwo()} className="bg-dark text-primary w-25 mx-auto heading">O</h1>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}