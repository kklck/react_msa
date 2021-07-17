import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import apply from "./components/apply"
import payment from "./components/payment"

class App extends Component{
  render(){
    return (
        <Router>
          <div align="center">
            <a href="/apply">청약 신청</a><br/>
            <a href="/payment">청약 결제</a>
          </div>
          <Route path="/apply" component={apply}/>
          <Route path="/payment" component={payment}/>
        </Router>
    );
  }
}

export default App;