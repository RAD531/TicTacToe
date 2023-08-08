import React, { Component } from 'react';
import Annoucement from './Annoucement.jsx';
import ResetButton from './ResetButton.jsx';
import Tile from './Tile.jsx';
import SelectMenu from './SelectMenu.jsx';

class TicTacToe extends Component {

    constructor() {
        super();
        this.state = {
            gameBoard: [
                ' ', ' ', ' ',
                ' ', ' ', ' ',
                ' ', ' ', ' '
            ],
            winner: null,
            turn: null,
            gameMessage: null,
            gameStart: false,
            maxPlayer: null,
            minPlayer: null,
            playerOne: { name: null, symbol: 'x', human: null },
            playerTwo: { name: null, symbol: 'o', human: null },
            againstAI: false,
        }
    };

    tie(board) {
        let moves = board.join('').replace(/ /g, '');
        if (moves.length === 9) {
            return true;
        }

        return false;
    }

    winner(board, player) {
        if (
            (board[0] === player && board[1] === player && board[2] === player) ||
            (board[3] === player && board[4] === player && board[5] === player) ||
            (board[6] === player && board[7] === player && board[8] === player) ||
            (board[0] === player && board[3] === player && board[6] === player) ||
            (board[1] === player && board[4] === player && board[7] === player) ||
            (board[2] === player && board[5] === player && board[8] === player) ||
            (board[0] === player && board[4] === player && board[8] === player) ||
            (board[2] === player && board[4] === player && board[6] === player)
        ) {
            return true;
        } else {
            return null;
        }
    }

    copyBoard(board) {
        return board.slice(0);
    }

    validMove(move, player, board) {
        let newBoard = this.copyBoard(board);
        if (newBoard[move] === ' ') {
            newBoard[move] = player;
            return newBoard;
        }

        else {
            return null;
        }
    }

    findAiMove(board) {
        let bestMoveScore = 100;
        let move = null;

        //test all possible moves if game not over
        if (this.winner(board, this.state.maxPlayer) || this.winner(board, this.state.minPlayer) || this.tie(board)) {
            return null;
        }

        for (let i = 0; i < board.length; i++) {
            let newBoard = this.validMove(i, this.state.minPlayer, board);
            if (newBoard) {
                let moveScore = this.maxScore(newBoard);
                if (moveScore < bestMoveScore) {
                    bestMoveScore = moveScore;
                    move = i;
                }
            }
        }

        return move;
    }

    minScore(board) {
        if (this.winner(board, this.state.maxPlayer)) {
            return 10;
        }

        else if (this.winner(board, this.state.minPlayer)) {
            return -10;
        }

        else if (this.tie(board)) {
            return 0;
        }

        else {
            let bestMoveValue = 100;
            for (let i = 0; i < board.length; i++) {
                let newBoard = this.validMove(i, this.state.minPlayer, board);
                if (newBoard) {
                    let predictedMoveValue = this.maxScore(newBoard);
                    if (predictedMoveValue < bestMoveValue) {
                        bestMoveValue = predictedMoveValue;
                    }
                }
            }

            return bestMoveValue;
        }
    }

    maxScore(board) {
        if (this.winner(board, this.state.maxPlayer)) {
            return 10;
        }

        else if (this.winner(board, this.state.minPlayer)) {
            return -10;
        }

        else if (this.tie(board)) {
            return 0;
        }

        else {
            let bestMoveValue = -100;
            for (let i = 0; i < board.length; i++) {
                let newBoard = this.validMove(i, this.state.maxPlayer, board);
                if (newBoard) {
                    let predictedMoveValue = this.minScore(newBoard);
                    if (predictedMoveValue > bestMoveValue) {
                        bestMoveValue = predictedMoveValue;
                    }
                }
            }

            return bestMoveValue;
        }
    }

    gameLoop(move) {

        let player = this.state.turn;
        let currentGameBoard = null;

        if (player.human) {
            currentGameBoard = this.validMove(move, player.symbol, this.state.gameBoard);

            this.setState(
                prevState => ({
                    turn: prevState.turn.symbol === "x" ? prevState.playerTwo : prevState.playerOne
                }),
                () => {
                    this.updateBoard(currentGameBoard, player, () => {
                        if ((player.human && !this.state.playerOne.human) || (player.human && !this.state.playerTwo.human)) {
                            this.gameLoop();
                        }
                    });
                }
            );
        }

        else {
            currentGameBoard = this.state.gameBoard;
            currentGameBoard = this.validMove(this.findAiMove(currentGameBoard), player.symbol, currentGameBoard);

            this.setState(
                prevState => ({
                    turn: prevState.turn.symbol === "x" ? prevState.playerTwo : prevState.playerOne
                }),
                () => {
                    this.updateBoard(currentGameBoard, player, () => {
                        return;
                    });
                }
            );
        }
    }

    updateBoard(currentGameBoard, player, callback) {
        if (!currentGameBoard || this.state.winner != null) {
            return;
        }

        if (this.winner(currentGameBoard, player.symbol)) {
            if (!player.name){
                player.name = "";
            }

            this.setState({
                gameBoard: currentGameBoard,
                winner: player.symbol,
                gameMessage: player.name + " (" + player.symbol + ")" + ' wins the game!'
            }, callback);
            return;
        }

        if (this.tie(currentGameBoard)) {
            this.setState({
                gameBoard: currentGameBoard,
                winner: 'd',
                gameMessage: 'The Game Finshes a Draw!'
            }, callback);
            return;
        }

        this.setState({
            gameBoard: currentGameBoard
        }, callback);
    }



    resetBoard() {
        this.setState({
            gameBoard: [
                ' ', ' ', ' ',
                ' ', ' ', ' ',
                ' ', ' ', ' '
            ],
            winner: null,
            turn: null,
            gameMessage: null,
            gameStart: false,
            maxPlayer: null,
            minPlayer: null,
            againstAI: false,
        })
    }

    render() {
        return <div className="container">

            <div style={{ display: this.state.gameStart ? "none" : "" }}>
                <SelectMenu
                    playerOneValue={this.state.playerOne}
                    setPlayerOneName={(name) => this.setState({ playerOne: { ...this.state.playerOne, name } })}
                    setPlayerOneHuman={(human) => this.setState({ playerOne: { ...this.state.playerOne, human } })}

                    playerTwoValue={this.state.playerTwo}
                    setPlayerTwoName={(name) => this.setState({ playerTwo: { ...this.state.playerTwo, name } })}
                    setPlayerTwoHuman={(human) => this.setState({ playerTwo: { ...this.state.playerTwo, human } })}

                    setMinPlayer={(minPlayer) => this.setState({minPlayer})}
                    setMaxPlayer={(maxPlayer) => this.setState({maxPlayer})}

                    setGameStart={gameStart => this.setState({ gameStart })}
                    setAgainstAI={againstAI => this.setState({ againstAI })}

                    setTurn={(turn, callback) => this.setState({ turn }, callback)}
                    gameLoop={this.gameLoop.bind(this)}
                />
            </div>

            <div style={{ display: this.state.gameStart ? "" : "none" }}>
                <div className='menu'>
                    <Annoucement winner={this.state.winner} gameMessage={this.state.gameMessage}></Annoucement>
                    <ResetButton reset={this.resetBoard.bind(this)}></ResetButton>
                </div>
                <div>
                    <table style={{ width: "100%", borderCollapse: "collaspe", borderStyle: "hidden" }}>
                        <tbody>
                            {Array.from({ length: 3 }, (_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Array.from({ length: 3 }, (_, colIndex) => {
                                        const i = rowIndex * 3 + colIndex;
                                        const value = this.state.gameBoard[i];
                                        return (
                                            <td style={{ width: "33.3%", border: "2px solid grey" }} key={i}>
                                                <Tile
                                                    loc={i}
                                                    value={value}
                                                    gameLoop={this.gameLoop.bind(this)}
                                                />
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    };
}

export default TicTacToe;