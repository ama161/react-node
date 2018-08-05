import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import ClassForm from './ClassForm';
import language from '../../language/language'
import {post} from '../../services/class';

class ClassModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            newClass: {},
            language: 0
        }
    }

    componentWillMount(){
        this.setState({viewModal: this.props.visible, language: sessionStorage.language})
    }

    componentWillReceiveProps(nextProps){
        this.setState({viewModal: nextProps.visible, language: sessionStorage.language})
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onHandleOk(){
        post(this.state.newClass)
        .then(result => {
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
            if(result.type === 'success') this.onCancel();
        })
    }

    render(){
        const lan = this.state.language;

        return(
            <Modal 
                title={language[lan].addClass} 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}
                footer={[
                    <button key="back" class="ant-btn" onClick={this.handleCancel}>{language[lan].cancel} </button>,
                    <button key="submit" class="ant-btn ant-btn-primary" onClick={this.onHandleOk}>
                        {language[lan].addClass} 
                    </button>
                ]}>
                <ClassForm onChangeClass={(newClass) => this.setState({newClass: newClass})}/>
            </Modal>
        )
    }
}

export default ClassModal