
import '../app.css';
import React, { Component } from 'react';
import ProductInfo from '../components/productInfo';
import PersonInfo from '../components/personInfo';
import InformationVideo from '../components/informationVideo';
import {Link  } from 'react-router-dom';

class SelectInsurance extends Component {
  state = { // 작업 완료 후 contractor, theInsured는 객체를 app.jsx로 보낸다.
    contractor : {  // 계약자
      relation : '',
      name : '',
      residentNum1: '',
      residentNum2: '',
      gender: '',
      insuranceAge: '',   // 보험나이
      insuranceBirth: '', // 상령일
      job: '',
      drivingJob: '',
      riskGrade: '',
      injuryGrade: '',
    },
    theInsured : { // 피보험자
      relation : '',
      name : '',
      residentNum1: '',
      residentNum2: '',
      gender: '',
      insuranceAge: '',   // 보험나이
      insuranceBirth: '', // 상령일
      job: '',
      drivingJob: '',
      riskGrade: '',
      injuryGrade: '',
    },
    insuranceProduct : {
      kind: '',
      name: '',
    },
    relationList : [
      {id:'1',val:'본인'},
      {id:'2',val:'배우자'},
      {id:'3',val:'부모'},
      {id:'4',val:'형제/자매'},
    ],
    genderList : [
      {id:'1',val:'남'},
      {id:'2',val:'여'},
    ],
    jobList : [
      {id:'1',val:'운송업'},
      {id:'2',val:'건설업'},
      {id:'3',val:'서비스업'},
      {id:'4',val:'요식업'},
      {id:'5',val:'운동선수'},
      {id:'6',val:'사무직'},
    ],
    drivingKindList : [
      {id:'1',val:'자가용승용차'},
      {id:'2',val:'영업용승합차'},
      {id:'3',val:'6종건설기계'},
      {id:'4',val:'일반건설기계'},
      {id:'5',val:'폭발물,인화물차량'},
      {id:'6',val:'경비행기헬기'},
    ],
    totalInsuranceList : [
      {id:'1',val:'무배당THE건강한치아보험V'},
      {id:'2',val:'무배당THE든든한실버치아보험'},
      {id:'3',val:'무배당전에없던실속치매보험'},
      {id:'4',val:'무배당간병비계속주는치매보험'},
      {id:'5',val:'무배당THE건강해지는종신보험'},
      {id:'6',val:'무배당THE간편고지종신보험'},
      {id:'7',val:'무배당초간편역시라이나암보험'},
      {id:'8',val:'무배당라이나퍼펙트케어암보험'},
      {id:'9',val:'무배당골라담는간편건강보험'},
      {id:'10',val:'무배당가족사랑플랜정기보험'},
    ],
    tetDmtInsuranceList : [
      {id:'1',val:'무배당THE건강한치아보험V'},
      {id:'2',val:'무배당THE든든한실버치아보험'},
      {id:'3',val:'무배당전에없던실속치매보험'},
      {id:'4',val:'무배당간병비계속주는치매보험'},
    ],
    lifeInsuranceList : [
      {id:'5',val:'무배당THE건강해지는종신보험'},
      {id:'6',val:'무배당THE간편고지종신보험'},
    ],
    cncInsuranceList : [
      {id:'7',val:'무배당초간편역시라이나암보험'},
      {id:'8',val:'무배당라이나퍼펙트케어암보험'},
    ],
    etcInsuranceList : [
      {id:'9',val:'무배당골라담는간편건강보험'},
      {id:'10',val:'무배당가족사랑플랜정기보험'},
    ],
    isNotSame : true,
    productKindList : [
      {id:'1',val:'전체'},
      {id:'2',val:'치아/치매'},
      {id:'3',val:'종신'},
      {id:'4',val:'암'},
      {id:'5',val:'기타'},
    ],
    videoUrlList : [
      {id:1,url:'https://www.youtube.com/watch?v=W1Pi_nY0ZHw'},// 치아
      {id:2,url:'https://www.youtube.com/watch?v=284CEIE16bs'},// 치매
      {id:3,url:'https://www.youtube.com/watch?v=T8Hdm6BsJ_A'},// 암
      {id:4,url:'https://www.youtube.com/watch?v=5-4s7uKugtg'},// 생명
      {id:5,url:'https://www.youtube.com/watch?v=KNhoAvfMQGo'},// 기타
    ],

    insurances: [],
  }
  calIsrAgeAndIsrBirth = (residentNum1,residentNum2) => {
    let birthYear = residentNum1.slice(0,2);
    let birthMonth = residentNum1.slice(2,4);
    let birthDate = residentNum1.slice(4);
    
    if(residentNum2.slice(0,1) === '1' || residentNum2.slice(0,1) === '2'){
      birthYear = '19' + birthYear;
    }else {
      birthYear = '20' + birthYear
    }
    let today = new Date();
    birthYear = parseInt(birthYear);  // 주민번호로부터 생년월일 얻음
    birthMonth = parseInt(birthMonth);  
    birthDate = parseInt(birthDate);    
    let toYear = today.getFullYear(); // 오늘날짜(계약일)
    let toMonth = today.getMonth() + 1; 
    let toDate = today.getDate();  

    let contractingDay = new Date(toYear,toMonth,toDate);
    let birthday = new Date(birthYear,birthMonth,birthDate)
    contractingDay.setMonth(contractingDay.getMonth() + 5)

    if(contractingDay.getDate() < birthday.getDate()){
      contractingDay.setMonth(contractingDay.getMonth() - 1)
    }
    if(contractingDay.getMonth() < birthday.getMonth()){
      contractingDay.setFullYear(contractingDay.getFullYear() - 1)
    }
    const isrAge = Number(contractingDay.getFullYear()) - Number(birthday.getFullYear())
    let isrBirthMon = 0;
    if(birthMonth >= 7){
      isrBirthMon = birthMonth - 6;
    }else {
      isrBirthMon = birthMonth + 6;
    }
    const isrBrith = String(toYear) + '.' + String(isrBirthMon) + '.' + String(birthDate)

    return[isrAge,isrBrith];
  }
  getContractorName = (name) => {
    this.setState({...this.state, contractor :{...this.state.contractor, name: name}});
  }
  getContractorRelation = (relation) => {
    this.setState({...this.state, contractor :{...this.state.contractor, relation: relation}});
  }
  getContractorGender = (gender) => {
    this.setState({...this.state, contractor :{...this.state.contractor, gender: gender}});
  }
  getContractorJob = (job) => {
    switch(job){
      case '운송업':
        this.setState({...this.state, contractor :{...this.state.contractor, job: job, riskGrade: 4}});
        break;
      case '건설업':
        this.setState({...this.state, contractor :{...this.state.contractor, job: job, riskGrade: 5}});
        break;
      case '서비스업':
        this.setState({...this.state, contractor :{...this.state.contractor, job: job, riskGrade: 1}});
        break;
      case '요식업':
        this.setState({...this.state, contractor :{...this.state.contractor, job: job, riskGrade: 2}});
        break;
      case '운동선수':
        this.setState({...this.state, contractor :{...this.state.contractor, job: job, riskGrade: 5}});
        break;
      default:
        this.setState({...this.state, contractor :{...this.state.contractor, job: job, riskGrade: 1}});
        break;
    }
  }
  getContractorDrivingKind = (carKind) => {
    switch(carKind){
      case '자가용승용차':
        this.setState({...this.state, contractor :{...this.state.contractor, drivingJob: carKind, injuryGrade: 'B'}});
        break;
      case '영업용승합차':
        this.setState({...this.state, contractor :{...this.state.contractor, drivingJob: carKind, injuryGrade: 'D'}});
        break;
      case '6종건설기계':
        this.setState({...this.state, contractor :{...this.state.contractor, drivingJob: carKind, injuryGrade: 'D'}});
        break;
      case '일반건설기계':
        this.setState({...this.state, contractor :{...this.state.contractor, drivingJob: carKind, injuryGrade: 'E'}});
        break;
      case '폭발물,인화물차량':
        this.setState({...this.state, contractor :{...this.state.contractor, drivingJob: carKind, injuryGrade: 'D'}});
        break;
      default:
        this.setState({...this.state, contractor :{...this.state.contractor, drivingJob: carKind, injuryGrade: 'B'}});
        break;
    }
  }
  getContractorResidentNum1 = (residentNum1) => {
    this.setState({...this.state, contractor :{...this.state.contractor, residentNum1: residentNum1}});
  }
  getContractorResidentNum2 = (rsdN2) => {
    const isrAge = this.calIsrAgeAndIsrBirth(this.state.contractor.residentNum1,rsdN2)[0];
    const isrBrith = this.calIsrAgeAndIsrBirth(this.state.contractor.residentNum1,rsdN2)[1];
    this.setState({...this.state, contractor :{...this.state.contractor, residentNum2: rsdN2}}, () => {
      this.setState({...this.state, contractor :{...this.state.contractor,insuranceAge: isrAge, insuranceBirth: isrBrith}});
    });
    //console.log('this.state.contractor: ',this.state.contractor);
  }
  getTheInsuredName = (name) => {
    this.setState({...this.state, theInsured :{...this.state.theInsured, name: name}});
  }
  getTheInsuredRelation = (relation) => {
    this.setState({...this.state, theInsured :{...this.state.theInsured, relation: relation}});
  }
  getTheInsuredGender = (gender) => {
    this.setState({...this.state, theInsured :{...this.state.theInsured, gender: gender}});
  }
  getTheInsuredJob = (job) => {
    this.setState({...this.state, theInsured :{...this.state.theInsured, job: job}});
  }
  getTheInsuredDrivingKind = (kind) => {
    this.setState({...this.state, theInsured :{...this.state.theInsured, drivingJob: kind}});
  }
  getTheInsuredResidentNum1 = (residentNum1) => {
    this.setState({...this.state, theInsured :{...this.state.theInsured, residentNum1: residentNum1}});
  }
  getTheInsuredResidentNum2 = (residentNum2) => {
    const isrAge = this.calIsrAgeAndIsrBirth(this.state.theInsured.residentNum1,residentNum2)[0]
    const isrBrith = this.calIsrAgeAndIsrBirth(this.state.theInsured.residentNum1,residentNum2)[1]
    this.setState({...this.state, theInsured :{...this.state.theInsured, residentNum2: residentNum2}}, () => {
      this.setState({...this.state, theInsured : {...this.state.theInsured,insuranceAge: isrAge, insuranceBirth: isrBrith}})
    });
  }
  getTheInsuredJob = (job) => {
    switch(job){
      case '운송업':
        this.setState({...this.state, theInsured :{...this.state.theInsured, job: job, riskGrade: 4}});
        break;
      case '건설업':
        this.setState({...this.state, theInsured :{...this.state.theInsured, job: job, riskGrade: 5}});
        break;
      case '서비스업':
        this.setState({...this.state, theInsured :{...this.state.theInsured, job: job, riskGrade: 1}});
        break;
      case '요식업':
        this.setState({...this.state, theInsured :{...this.state.theInsured, job: job, riskGrade: 2}});
        break;
      case '운동선수':
        this.setState({...this.state, theInsured :{...this.state.theInsured, job: job, riskGrade: 5}});
        break;
      default:
        this.setState({...this.state, theInsured :{...this.state.theInsured, job: job, riskGrade: 1}});
        break;
    }
  }
  getTheInsuredDrivingKind = (carKind) => {
    switch(carKind){
      case '자가용승용차':
        this.setState({...this.state, theInsured :{...this.state.theInsured, drivingJob: carKind, injuryGrade: 'B'}});
        break;
      case '영업용승합차':
        this.setState({...this.state, theInsured :{...this.state.theInsured, drivingJob: carKind, injuryGrade: 'D'}});
        break;
      case '6종건설기계':
        this.setState({...this.state, theInsured :{...this.state.theInsured, drivingJob: carKind, injuryGrade: 'D'}});
        break;
      case '일반건설기계':
        this.setState({...this.state, theInsured :{...this.state.theInsured, drivingJob: carKind, injuryGrade: 'E'}});
        break;
      case '폭발물,인화물차량':
        this.setState({...this.state, theInsured :{...this.state.theInsured, drivingJob: carKind, injuryGrade: 'D'}});
        break;
      default:
        this.setState({...this.state, theInsured :{...this.state.theInsured, drivingJob: carKind, injuryGrade: 'B'}});
        break;
    }
  }

  copyPersonInfo = () => {
    const relation = this.state.contractor.relation;
    const name = this.state.contractor.name;
    const gender = this.state.contractor.gender;
    const job = this.state.contractor.job;
    const drivingJob = this.state.contractor.drivingJob;
    const residentNum1 = this.state.contractor.residentNum1;
    const residentNum2 = this.state.contractor.residentNum2;
    const insuranceAge = this.state.contractor.insuranceAge;
    const insuranceBirth = this.state.contractor.insuranceBirth;
    const riskGrade =this.state.contractor.riskGrade;
    const injuryGrade =this.state.contractor.injuryGrade;

    this.setState({
      ...this.state,
      theInsured: {
        ...this.state.theInsured,
        relation:relation,
        name : name,
        gender : gender,
        job : job,
        drivingJob : drivingJob,
        residentNum1 : residentNum1,
        residentNum2 : residentNum2,
        insuranceAge: insuranceAge,
        insuranceBirth: insuranceBirth,
        riskGrade: riskGrade,
        injuryGrade: injuryGrade,
      },
      isNotSame : false
    })
    //console.log(this.state.theInsured)
    
  }
  getProductKind = (productKind) => {
    this.setState({...this.state, productKind: productKind })
    switch(productKind){
      case '전체':
        this.setState({...this.state, insurances: this.state.totalInsuranceList},() => {
          this.setState({...this.state, insuranceProduct : {...this.state.insuranceProduct, kind:productKind}});
        });
        break;
      case '치아/치매':
        this.setState({...this.state, insurances: this.state.tetDmtInsuranceList},() => {
          this.setState({...this.state, insuranceProduct : {...this.state.insuranceProduct, kind:productKind}});
        });
        break;
      case '종신':
        this.setState({...this.state, insurances: this.state.lifeInsuranceList},() => {
          this.setState({...this.state, insuranceProduct : {...this.state.insuranceProduct, kind:productKind}});
        });
        break;
      case '암':
        this.setState({...this.state, insurances: this.state.cncInsuranceList},() => {
          this.setState({...this.state, insuranceProduct : {...this.state.insuranceProduct, kind:productKind}});
        });
        break;
      case '기타':
        this.setState({...this.state, insurances: this.state.etcInsuranceList},() => {
          this.setState({...this.state, insuranceProduct : {...this.state.insuranceProduct, kind:productKind}});
        });
        break;
      default:
        this.setState({...this.state, insurances: this.state.totalInsuranceList},() => {
          this.setState({...this.state, insuranceProduct : {...this.state.insuranceProduct, kind:productKind}});
        });
        break;
    }
  }
  getProductName = (productName) => {
    this.setState({...this.state, insuranceProduct : {...this.state.insuranceProduct, name:productName} })
  }
  submitData = () => {
    console.log('계약자: ',this.state.contractor);
    console.log('피보험자: ',this.state.theInsured);
    console.log('상품정보: ',this.state.insuranceProduct);
  }
  
  render() {
    return (
      <div className='app'>
        <div className='line'>
          <span className="cpnt-title">계약자</span>
          <img className='logo-image' src='./lina_logo.png' alt='라이나생명 CI'></img>
        </div>

        <PersonInfo 
          relationList={this.state.relationList}
          genderList={this.state.genderList}
          jobList={this.state.jobList}
          drivingKindList={this.state.drivingKindList}
          isrAge={this.state.contractor.insuranceAge}
          isrBrith={this.state.contractor.insuranceBirth}
          isRiskGrade={this.state.contractor.riskGrade}
          isInjuryGrade={this.state.contractor.injuryGrade}
          getName={this.getContractorName}
          getRelation={this.getContractorRelation}
          getGender={this.getContractorGender}
          getJob={this.getContractorJob}
          getDrivingKind={this.getContractorDrivingKind}
          getResidentNum1={this.getContractorResidentNum1}
          getResidentNum2={this.getContractorResidentNum2}>
        </PersonInfo>

        <div className='division'></div>
        <div className='line'>
          <span className="cpnt-title">피보험자</span>
          <button className='samePerson' onClick={this.copyPersonInfo}>계약자와 동일</button>
        </div>
        {this.state.isNotSame && <PersonInfo className='theInsured'
          relationList={this.state.relationList}
          genderList={this.state.genderList}
          jobList={this.state.jobList}
          drivingKindList={this.state.drivingKindList}
          isrAge={this.state.theInsured.insuranceAge}
          isrBrith={this.state.theInsured.insuranceBirth}
          isRiskGrade={this.state.theInsured.riskGrade}
          isInjuryGrade={this.state.theInsured.injuryGrade}
          getName={this.getTheInsuredName}
          getRelation={this.getTheInsuredRelation}
          getGender={this.getTheInsuredGender}
          getJob={this.getTheInsuredJob}
          getDrivingKind={this.getTheInsuredDrivingKind}
          getResidentNum1={this.getTheInsuredResidentNum1}
          getResidentNum2={this.getTheInsuredResidentNum2}>
        </PersonInfo>}

        <div className='division'></div>
        <div className='line'>
          <span className="cpnt-title">상품정보</span>
        </div>

        <ProductInfo
          productKindList={this.state.productKindList}
          insurances={this.state.insurances}
          getProductKind={this.getProductKind}
          getProductName={this.getProductName}
        ></ProductInfo>

        <div className='division'></div>
        <div className='line'>
          <span className="cpnt-title">상품 소개 영상</span>
        </div>

        <InformationVideo
          productName={this.state.insuranceProduct.name}
          videoUrlList={this.state.videoUrlList}
        ></InformationVideo>

        <div className='division'></div>
        {/* <button className='infoSubmit' type='submit' onClick={this.submitData}>
          제출하기 
        </button> */}
        <Link to={{
            pathname:'/contract',
            state:{
              contractor: this.state.contractor,
              theInsured: this.state.theInsured 
            }
          }}>
          <button className='infoSubmit' type='submit' onClick={this.submitData}>
            제출하기 
          </button>
        </Link>
      </div>
    );
  }
}

export default SelectInsurance;