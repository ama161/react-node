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
            newStudent: {}
        }
    }

    componentWillMount(){
        this.setState({viewModal: this.props.visible})
    }

    componentWillReceiveProps(nextProps){
        this.setState({viewModal: nextProps.visible})
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
        const lan = 0;

        return(
            <Modal 
                title={language[lan].addStudents} 
                onHandleOk={this.onHandleOk} 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}>
                <StudentForm onChangeStudent={(newStudent) => this.setState({newStudent: newStudent})}/>
            </Modal>
        )
    }
}

export default StudentModal