import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import StudentForm from './StudentForm';
import language from '../../language/language'
import {post} from '../../services/user';

class StudentModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            newStudent: {},
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
        post(this.state.newStudent, 'student')
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
                title={language[lan].addStudents} 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}
                footer={[
                    <button key="back" class="ant-btn" onClick={this.onCancel}>{language[lan].cancel} </button>,
                    <button key="submit" class="ant-btn ant-btn-primary" onClick={this.onHandleOk}>
                        {language[lan].addStudents} 
                    </button>
                ]}>
                <StudentForm onChangeStudent={(newStudent) => this.setState({newStudent: newStudent})}/>
            </Modal>
        )
    }
}

export default StudentModal