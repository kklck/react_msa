import React, { Component } from 'react';

class ContractInfo extends Component {
    

    render() {
        return (
        <>
            <div className='line'>
                <span className='info'>계약자/피보험자</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                <span>{this.props.contractor.name}</span>
                <span>  /  </span>
                <span>{this.props.theInsured.name}</span>
            </div>
            <div className='line'>
                <span className='info'>가입금액</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                <span>1000 만원</span>
            </div>
            <div className='line'>
                <span className='info'>보험기간/납입기간</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                <span>5년</span>
                <span>  /  </span>
                <span>5년</span>
                <span> 납기</span>
            </div>
            <div className='line'>
                <span className='info'>납입주기</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                <span>월납</span>
            </div>
            <div className='line'>
                <span className='info'>가입금액</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                <span>75300원</span>
            </div>
        </>
            
        );
    }
}

export default ContractInfo;