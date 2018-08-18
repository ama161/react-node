import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import {postClassTeacher} from '../../services/class';
import SelectClass from '../utils/select/SelectClass';

class ClassTeacherModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            class: '',
            id_teacher: '',
            language: ''
        }
    }

    componentWillMount(){
        this.setState({viewModal: this.props.visible, id_teacher: this.props.id_teacher, language: sessionStorage.language})
    }

    componentWillReceiveProps(nextProps){
        this.setState({viewModal: nextProps.visible, id_teacher: nextProps.id_teacher})
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onHandleOk(){
        postClassTeacher({
            id_class: this.state.class,
            id_teacher: this.state.id_teacher
        })
        .then(result => {
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
            if(result.type === 'success') this.onCancel();
        })
    }

    onChangeClass(event){
        this.setState({class: event})
    }
    
    render(){
        const lan = (this.state.language) ? this.state.language : 0;
        return(
            <Modal 
                title={language[lan].addClass} 
                onHandleOk={this.onHandleOk} 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}>
                <div className="form-item">
                    <label>{language[lan].class}</label>
                    <SelectClass onHandleChange={(value) => this.onChangeClass(value)}/>
                </div>
            </Modal>
        )
    }
}

export default ClassTeacherModal