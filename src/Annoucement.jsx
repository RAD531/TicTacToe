import React, {Component} from "react";
import './css/annoucement.css';

export default class Annoucement extends Component{
    render() {
        return (
            <div className={this.props.winner ? 'visible' : 'hidden'}>
                <h2>Game Over</h2>
            </div> 
        )
    }
}