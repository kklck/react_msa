import React, { Component } from 'react';

class AdditionalContent extends Component {
    
    render() {
        return (
            <div>
                <div className='line'>
                    <span className='info'>특약명</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                    <span>무배당보철치료보장특약</span>
                </div>
                <div className='line'>
                    <span className='info'>보험기간/납입기간</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                    <span>5년</span>
                    <span>  /  </span>
                    <span>5년</span>
                    <span> 납기</span>
                </div>
                <div className='line'>
                    <span className='info'>가입금액</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                    <span>1500 만원</span>
                </div>
                <div className='line'>
                    <span className='info'>보험료</span><span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                    <span>47100 원</span>
                </div>
                <div className='division'></div>
            </div>
        );
    }
}


export default AdditionalContent;