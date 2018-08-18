import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import AssistanceForm from './AssistanceForm';
import {postAssistance} from '../../services/calendar'
import ExamForm from './ExamForm';
import MakeParentForm from './MakeParentForm';

class AssistanceModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            date: '',
            language: 0,
            newAssistance: {},
            viewAssistance: true,
            viewMakeParent: false,
            viewRemember: false
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
        let assistance = {};
        if(this.state.viewAssistance){
            assistance = {
                id_student: this.state.newAssistance.studentId,
                id_class: this.state.newAssistance.classId,
                date: this.state.date,
                description: this.state.newAssistance.description,
                type: 'error',
                id_subject: null
            }
        }
        else if(this.state.viewRemember){
            assistance = {
                id_student: null,
                id_subject: this.state.newAssistance.subjectId,
                id_class: this.state.newAssistance.classId,
                date: this.state.date,
                description: this.state.newAssistance.description,
                type: 'warning'
            }
        }
        else{
            assistance = {
                id_student: this.state.newAssistance.studentId,
                id_subject: null,
                id_class: this.state.newAssistance.classId,
                date: this.state.date,
                description: this.state.newAssistance.description,
                type: 'warning'
            }
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
                onHandleOk={() => this.onHandleOk()}
                className="big-modal">
                <h2>{this.state.date}</h2>
                <div className="homeTeacher-containerAssistanceModal-buttons">
                    <button 
                        class="ant-btn ant-btn-primary" 
                        onClick={() => this.setState({viewAssistance: true, viewRemember: false, viewMakeParent: false})}>
                        {language[lan].assistance}
                    </button>
                    <button 
                        class="ant-btn" 
                        onClick={() => this.setState({viewRemember: true, viewAssistance: false, viewMakeParent: false})}>
                        {language[lan].remember}
                    </button>
                    <button 
                        class="ant-btn" 
                        onClick={() => this.setState({viewMakeParent: true, viewRemember: false, viewAssistance: false})}>
                        {language[lan].makeParent}
                    </button>
                </div>
                {this.state.viewAssistance
                    ? <AssistanceForm onNewAssistance={(newAssistance) => this.setState({newAssistance: newAssistance})}/>
                    : this.state.viewMakeParent
                        ? <MakeParentForm onNewAssistance={(newAssistance) => this.setState({newAssistance: newAssistance})}/>
                        : this.state.viewRemember
                            ? <ExamForm onNewAssistance={(newAssistance) => this.setState({newAssistance: newAssistance})}/>
                            :null
                }
            </Modal>
        )
    }
}

export default AssistanceModal