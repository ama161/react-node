import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import QuestionForm from './QuestionForm';
import {post} from '../../services/question';

class QuestionModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            language: '',
            newQuestion: {}
        }
    }

    componentWillMount(){
        this.setState({
            viewModal: this.props.visible, language: sessionStorage.language
        })
    }

    componentWillReceiveProps(nextProps){      
        this.setState({
            viewModal: nextProps.visible,
        })
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onHandleOk(){
        console.log(this.state.newQuestion)
        post(this.state.newQuestion)
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
                        {language[lan].addQuestion}
                    </button>
                ]}>
                <QuestionForm 
                    onChangeQuestion={(newQuestion) => this.setState({newQuestion: newQuestion})}/>
            </Modal>
        )
    }
}

export default QuestionModal