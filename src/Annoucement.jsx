import React, {Component} from "react";
import './css/annoucement.css';

export default class Annoucement extends Component{
    render() {
        return (
            <div className={this.props.winner ? 'winner' : ''}>
                <h2>{this.props.gameMessage}</h2>
            </div> 
        )
    }
}