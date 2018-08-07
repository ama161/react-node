import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import {postClassTeacher} from '../../services/class';
import {postStudentParent} from '../../services/user';
import SelectStudent from '../utils/select/SelectStudent';

class ParentStudentModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            student: '',
            id_parent: '',
            language: ''
        }
    }

    componentWillMount(){
        console.log(this.props.id_parent)
        this.setState({viewModal: this.props.visible, id_parent: this.props.id_parent, language: sessionStorage.language})
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.id_parent)        
        this.setState({viewModal: nextProps.visible, id_parent: nextProps.id_parent})
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onHandleOk(){
        postStudentParent(this.state.id_parent, this.state.student)
        .then(result => {
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
            if(result.type === 'success') this.onCancel();
        })
    }

    onChangeStudent(event){
        this.setState({student: event})
    }
    
    render(){
        const lan = (this.state.language) ? this.state.language : 0;

        return(
            <Modal 
                title={language[lan].addStudent} 
                onHandleOk={this.onHandleOk} 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}>
                <div className="form-item">
                    <label>{language[lan].student}</label>
                    <SelectStudent onHandleChange={(value) => this.onChangeStudent(value)}/>
                </div>
            </Modal>
        )
    }
}

export default ParentStudentModal