import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import SubjectForm from './SubjectForm';
import {post} from '../../services/subject'

class SubjectModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            newSubject: {},
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
        console.log(this.state.newSubject)
        post(this.state.newSubject)
        .then(result => {
            console.log(result);
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
            if(result.type === 'success') this.onCancel();
        })
    }

    render(){
        const lan = this.state.language;

        return(
            <Modal 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}
                footer={[
                    <button key="back" class="ant-btn" onClick={this.onCancel}>{language[lan].cancel} </button>,
                    <button key="submit" class="ant-btn ant-btn-primary" onClick={this.onHandleOk}>
                        {language[lan].addSubjects} 
                    </button>
                ]}>
                <SubjectForm onChangeSubject={(subject) => this.setState({newSubject: subject})}/>
            </Modal>
        )
    }
}

export default SubjectModal