import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import AssistanceForm from './AssistanceForm';
import {postAssistance} from '../../services/calendar'

class AssistanceModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            date: '',
            language: 0,
            newAssistance: {}
        }
    }

    componentWillMount(){
        this.setState({viewModal: this.props.visible, date: this.props.date, language: sessionStorage.language})        
    }

    componentWillReceiveProps(nextProps){
        this.setState({viewModal: nextProps.visible, date: nextProps.date, language: sessionStorage.language})
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onHandleOk(){
        const assistance = {
            id_student: this.state.newAssistance.studentId,
            id_class: this.state.newAssistance.classId,
            date: this.state.date,
            description: this.state.newAssistance.description,
            type: 'error'
        }
        postAssistance(assistance)
        .then(result => {
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
            this.onCancel();
        })
        .catch(err => console.log(err))
    }

    onChangeClass(event){
        this.setState({class: event})
    }
    
    render(){
        const lan = this.state.language;

        return(
            <Modal 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}
                onHandleOk={() => this.onHandleOk()}>
                <h2>{language[lan].assistance}: {this.state.date}</h2>
                <AssistanceForm onNewAssistance={(newAssistance) => this.setState({newAssistance: newAssistance})}/>
            </Modal>
        )
    }
}

export default AssistanceModal