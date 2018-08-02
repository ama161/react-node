import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import TeacherForm from './TeacherForm';
import language from '../../language/language'
import {post} from '../../services/user';

class TeacherModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            newTeacher: {}
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
        console.log(this.state.newTeacher);
        post(this.state.newStudent, 'teacher')
        .then(result => {
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
            if(result.type === 'success') this.setState({viewModal: false});
        })
    }

    render(){
        const lan = 0;

        return(
            <Modal 
                title={language[lan].addTeachers} 
                onHandleOk={this.onHandleOk} 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}>
                <TeacherForm onHandleChange={(newTeacher) => this.setState({newTeacher: newTeacher})}/>
            </Modal>
        )
    }
}

export default TeacherModal