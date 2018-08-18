import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import {getParentStudent} from '../../services/user'

class ParentInfoModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            id_student: '',
            language: '',
            student_parent: {}
        }
    }

    componentWillMount(){
        getParentStudent(this.props.id_student)
        .then(result => {
            this.setState({
                viewModal: this.props.visible, 
                id_student: this.props.id_student, 
                language: sessionStorage.language,
                student_parent: result
            })  
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({viewModal: nextProps.visible, id_student: nextProps.id_student})
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onHandleOk(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onChangeClass(event){
        this.setState({class: event})
    }
    
    render(){
        const lan = (this.state.language) ? this.state.language : 0;

        return(
            <Modal 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}
                footer={[
                    <button key="submit" class="ant-btn ant-btn-primary" onClick={this.onHandleOk}>
                        OK
                    </button>
                ]}>
                <h2>PARENTS:</h2>
                {Object.values(this.state.student_parent).map((key, index) => (
                    <div>
                        <p>{language[lan].name} {key.name}</p>
                        <p>{language[lan].phone} {key.phone}</p>
                    </div>
                ))}
            </Modal>
        )
    }
}

export default ParentInfoModal