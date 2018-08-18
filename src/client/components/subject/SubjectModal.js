import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import SubjectForm from './SubjectForm';
import {post, put} from '../../services/subject'

class SubjectModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            newSubject: {},
            language: 0,
            id_subject: ''
        }
    }

    componentWillMount(){
        this.setState({viewModal: this.props.visible, language: sessionStorage.language, id_subject: this.props.id_subject})
    }

    componentWillReceiveProps(nextProps){
        this.setState({viewModal: nextProps.visible, language: sessionStorage.language, id_subject: nextProps.id_subject})
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onHandleOk(){
        if(this.state.id_subject){
            put(this.state.newSubject, this.state.id_subject)
            .then(result => {
                if(result.hasOwnProperty('msg'))
                    message[result.type](result.msg)
                if(result.type === 'success') this.onCancel();
            })
        }else{
            post(this.state.newSubject)
            .then(result => {
                if(result.hasOwnProperty('msg'))
                    message[result.type](result.msg)
                if(result.type === 'success') this.onCancel();
            })
        }
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
                <SubjectForm onChangeSubject={(subject) => this.setState({newSubject: subject})} id_subject={this.state.id_subject}/>
            </Modal>
        )
    }
}

export default SubjectModal