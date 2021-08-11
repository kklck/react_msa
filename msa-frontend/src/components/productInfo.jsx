import React, { Component } from 'react';
import ComboBox from './comboBox';

class ProductInfo extends Component {
    getData = (event) => {
        this.props.getTextBoxVal(event.target.value);
        
    }
    getProductKind = (productKind) => {
        this.props.getProductKind(productKind)
    }
    getProductName = (productName) => {
        this.props.getProductName(productName)
    }
    render() {
        return (
            <div className='productInfo'>
                <div className='line'>
                    <span>상품 구분 </span>
                    <ComboBox
                        dataList={this.props.productKindList}
                        getComboBoxVal={this.getProductKind}>
                    </ComboBox>
                </div>
                <div className='line'>
                    <span>상품 이름 </span>
                    <ComboBox
                        dataList={this.props.insurances}
                        getComboBoxVal={this.getProductName}>
                    </ComboBox>
                </div>     
            </div>
        );
    }
}


export default ProductInfo;