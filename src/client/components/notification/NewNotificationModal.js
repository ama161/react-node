import React from 'react';
import { message } from 'antd';

import Input from '../utils/Input';
import SelectStudent from '../utils/select/SelectStudent'
import Modal from '../utils/Modal'
import language from '../../language/language'
import { post } from '../../services/notification';

class NewNotificationModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            language: 0,
            studentId: '',
            description: ''
        }
    }

    componentWillMount(){
        this.setState({viewModal: this.props.visible, language: sessionStorage.language, studentId: this.props.studentId})
    }

    componentWillReceiveProps(nextProps){       
        this.setState({viewModal: nextProps.visible, language: sessionStorage.language, studentId: nextProps.studentId})
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onChangeStudent(value){
        this.setState({studentId: value})
    }

    onHandleOk(){
        console.log(this.state)
        let notification = {
            id_student: this.state.studentId,
            description: this.state.description
        }
        post(notification)
        .then(result => {
            console.log(result)
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
            this.onCancel();
        })
        .catch(err => console.log(err))
    }
    
    render(){
        const lan = (this.state.language) ? this.state.language : 0;

        return(
            <Modal 
                title={language[lan].notification} 
                onHandleOk={this.onHandleOk} 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}>
                <div className="form-item">
                    <label>{language[lan].description}</label>
                    <textarea
                        value = {this.state.description}
                        onChange = {(event) => 
                            this.setState({description: event.target.value})
                        }
                    />
                </div>
                
            </Modal>
        )
    }
}

export default NewNotificationModal