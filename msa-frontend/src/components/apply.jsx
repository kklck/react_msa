import {Component} from "react";
import axios from "axios";

class Apply extends Component{

  getApply=()=>{
    axios.post("http://localhost:8003/apply/check.do",{
      info : "success"
    }).then(function (res){
      console.log(res.data)
    }).catch(function (error){
      console.log(error)
    }).then(function (){
      //항상 실행
    })
  }

  render() {
    return(
        <div align="center">
          apply
          <br/>
          <button onClick={this.getApply}>Apply 서버</button>
        </div>
    )
  }

}

export default Apply;