
import '../app.css';
import React, { Component } from 'react';
import ContractInfo from '../components/contractInfo';
import MainContent from '../components/mainContent';
import AdditionalContent from '../components/additionalContent';

class Contraction extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contractor : props.location.state.contractor,
      theInsured : props.location.state.theInsured
    }

  }

  render() {
    return (
      <div className='app'>
        <div className='line cpnt-title'>
          보험계약정보
          <img className='logo-image' src='./lina_logo.png' alt='라이나생명 CI'></img>
        </div>
        <div className="division"></div>
        <ContractInfo contractor={this.state.contractor} theInsured={this.state.theInsured}>  
        </ContractInfo> {/* 계약 내용 데이터 서버에서 들어감 */}
        <div className="division"></div>
        <div className='line cpnt-title'>주계약/특약</div>
        <div className="division"></div>
        <MainContent></MainContent>{/* 주계약 데이터 서버에서 가져옴 */}
        <AdditionalContent></AdditionalContent>{/* 특약 데이터 서버에서 가져옴 */}
      </div>
    );
  }
}

export default Contraction;
