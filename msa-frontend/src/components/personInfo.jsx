import React, { Component } from 'react';
import ComboBox from './comboBox';

class PersonInfo extends Component {

    getData = (event) => {
        this.props.getTextBoxVal(event.target.value);
    }
    getName = (event) => {
        this.props.getName(event.target.value)
    }
    getRelation = (relation) => {
        this.props.getRelation(relation)
    }
    getGender = (gender) => {
        this.props.getGender(gender)
    }
    getJob = (job) => {
        this.props.getJob(job)
    }
    getDrivingKind = (kind) => {
        this.props.getDrivingKind(kind)
    }
    getResidentNum1 = (event) => {
        this.props.getResidentNum1(event.target.value)
    }
    getResidentNum2 = (event) => {
        this.props.getResidentNum2(event.target.value)
    }
    
    render() {
        return (
            <div className='personInfo'>
                <div className='line'>
                    <span>관계 </span>
                    <ComboBox 
                        dataList={this.props.relationList}  
                        getComboBoxVal={this.getRelation}>
                    </ComboBox>
                </div>
                <div className='line'>
                    <span>성명 </span>
                    <input className='shortIpt' type="text" onChange={this.getName}/>
                    <span>성별 </span> 
                    <ComboBox
                        dataList={this.props.genderList}
                        getComboBoxVal={this.getGender}>
                    </ComboBox>
                </div>
                <div className='line'>
                    <span>주민등록번호 </span> 
                    <input className='shortIpt' type="text" onChange={this.getResidentNum1}/>
                    <p className='dash'> ㅡ </p>
                    <input className='shortIpt' type="text" onChange={this.getResidentNum2}/>
                </div>
                <div className='line'>
                    <span>보험 연령 </span>
                    <input className='shortestIpt' type="text" defaultValue={this.props.isrAge} />
                    <span>상령 일자 </span>
                    <input className='shortIpt' type="text" defaultValue={this.props.isrBrith} />
                </div>
                <div className='line'>
                    <span>직업 </span>
                    <ComboBox
                        dataList={this.props.jobList}
                        getComboBoxVal={this.getJob}
                    ></ComboBox>
                </div>
                <div className='line'>
                    <span>운전 직업 </span>
                    <ComboBox
                        dataList={this.props.drivingKindList}
                        getComboBoxVal={this.getDrivingKind}
                    ></ComboBox>
                </div>
                <div className='line'>
                    <span>위험 등급 </span>
                    <input className='shorterIpt' type="text" defaultValue={this.props.isRiskGrade} />
                    <span>상해 등급 </span>
                    <input className='shorterIpt' type="text" defaultValue={this.props.isInjuryGrade} />
                </div>
            </div>
        );
    }
}


export default PersonInfo;