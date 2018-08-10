import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import DossierForm from '../dossier/DossierForm';
import {post} from '../../services/dossier';

class ClassTeacherModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            id_student: '',
            id_teacher: '',
            language: '',
            newDossier: {}
        }
    }

    componentWillMount(){
        console.log(this.props.id_student)
        this.setState({
            viewModal: this.props.visible, id_teacher: this.props.id_teacher, language: sessionStorage.language, id_student: this.props.id_student
        })
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.id_teacher)        
        this.setState({
            viewModal: nextProps.visible, id_teacher: nextProps.id_teacher, id_student: nextProps.id_student
        })
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onHandleOk(){
        post(this.state.id_student, this.state.id_teacher, this.state.newDossier)
        .then(result => {
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
            if(result.type === 'success') this.onCancel();
        })
    }
    
    render(){
        const lan = (this.state.language) ? this.state.language : 0;
        return(
            <Modal 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}
                footer={[
                    <button key="submit" class="ant-btn" onClick={this.onCancel}>
                        {language[lan].cancel}
                    </button>,
                    <button key="submit" class="ant-btn ant-btn-primary" onClick={this.onHandleOk}>
                        {language[lan].addEvaluation}
                    </button>
                ]}>
                <DossierForm onChangeDossier={(newDossier) => this.setState({newDossier: newDossier})}/>
            </Modal>
        )
    }
}

export default ClassTeacherModal