
import React, { Component } from 'react';



class TextBox extends Component {

    getData = (event) => {
        this.props.getTextBoxVal(event.target.value);

    }

    render() {
        return (
            <input
                type="text"
                onChange={this.getData}
            />
        );
    }
}

export default TextBox;