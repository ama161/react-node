import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'

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
                
            </Modal>
        )
    }
}

export default SuccessAssistanceModal