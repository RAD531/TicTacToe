import React, {Component} from "react";
import { Button } from "reactstrap";

export default class ResetButton extends Component{
    render() {
        return (
            <Button className="m-3" color="primary" onClick={this.props.reset}>Reset</Button>
        )
    }
}