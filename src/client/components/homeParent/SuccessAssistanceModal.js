import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import {putAssistance} from '../../services/calendar'

class SuccessAssistanceModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            date: '',
            language: 0,
            newAssistance: {},
            viewAssistance: true
        }
    }

    componentWillMount(){
        console.log(this.props.infoDate)
        this.setState({viewModal: this.props.visible, infoDate: this.props.infoDate, language: sessionStorage.language})        
    }

    componentWillReceiveProps(nextProps){
        this.setState({viewModal: nextProps.visible, infoDate: nextProps.infoDate, language: sessionStorage.language})
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onHandleOk(){
        console.log('justify')
        putAssistance(this.state.infoDate.description)
        .then(result => {
            console.log(result);
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
                title={language[lan].justify}
                onHandleCancel={() => this.onCancel()}
                onHandleOk={() => this.onHandleOk()}>
                <h3>{this.state.infoDate.date}</h3>
                <p>{this.state.infoDate.username} {this.state.infoDate.description}</p>
            </Modal>
        )
    }
}

export default SuccessAssistanceModal