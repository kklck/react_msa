import {Component} from "react";
import axios from "axios";
import TextBox from "./TextBox";

class Payment extends Component {

    state = {
        age: 0,
        count: 0,
        result: 0
    }

    getAgeVal = (value) => {
        this.setState({
            ...this.state, age:parseInt(value)
        })
    }


    getCountVal = (value) => {
        this.setState({
            ...this.state, count:parseInt(value)
        })
    }

    getPayment = () => {
        this.getAgeVal()
        this.getCountVal()
        let pre = this.state
        console.log(this.state)
        axios.post("http://localhost:8003/payment/calculate.do", {
            age: pre.age,
            count : pre.count
        }).then(function (res) {
            console.log(res.data)
        }).catch(function (error) {
            console.log(error)
        }).then(function () {
            //항상 실행
        })
    }

    render() {
        return (
            <div align="center">
                payment
                <br/><label>나이 : </label>
                <TextBox getTextBoxVal={this.getAgeVal}/>
                <br/>
                <br/><label>수술 횟수: </label>
                <TextBox getTextBoxVal={this.getCountVal}/>
                <br/>
                <button onClick={this.getPayment}>Payment 서버</button>
            </div>
        )
    }
}

export default Payment;