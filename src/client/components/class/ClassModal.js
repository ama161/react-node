import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import ClassForm from './ClassForm';
import language from '../../language/language'
import {post} from '../../services/class';

class StudentModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            newClass: {}
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
        post(this.state.newClass)
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
                title={language[lan].addClass} 
                onHandleOk={this.onHandleOk} 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}>
                <ClassForm onChangeClass={(newClass) => this.setState({newClass: newClass})}/>
            </Modal>
        )
    }
}

export default StudentModal