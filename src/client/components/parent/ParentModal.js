import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import ParentForm from './ParentForm';
import language from '../../language/language'
import {post} from '../../services/user';

class ParentModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            newParent: {},
            language: ''
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
        if(this.state.newParent.student === ''){
            message.warning('Student necessary');
            return;
        }
        post(this.state.newParent, 'parent')
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
                title={language[lan].addParents} 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}
                footer={[
                    <button key="back" class="ant-btn" onClick={this.handleCancel}>{language[lan].cancel} </button>,
                    <button key="submit" class="ant-btn ant-btn-primary" onClick={this.onHandleOk}>
                        {language[lan].addParents} 
                    </button>
                ]}>
                <ParentForm onHandleChange={(newParent) => this.setState({newParent: newParent})}/>
            </Modal>
        )
    }
}

export default ParentModal