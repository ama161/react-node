import React from 'react';
import { message } from 'antd';

import Modal from '../utils/Modal'
import language from '../../language/language'
import { post } from '../../services/notification';
import NotificationForm from './NotificationForm';
import { getTeachersStudent } from '../../services/user';
import { userByRole } from '../../functions/userByRole';

class NewNotificationModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            language: 0,
            studentId: '',
            notification: {}
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
        let notification;

        if(this.props.notificationReply){
            notification = {
                id_student: this.props.notificationReply.id_student,
                id_teacher: this.props.notificationReply.id_teacher,
                id_parent: this.props.notificationReply.id_parent,
                description: this.state.notification.description
            }
        }
        else{
            notification = {
                id_student: this.state.studentId,
                id_teacher: this.state.notification.idTeacher,
                id_parent: this.state.notification.idParent,
                description: this.state.notification.description
            }
        }

        userByRole()
        .then((result) => {
            let data = {
                notification: notification,
                userId: sessionStorage.idUser,
                user: result
            }

            post(data)
            .then(result => {
                if(result.hasOwnProperty('msg'))
                    message[result.type](result.msg)
                this.onCancel();
            })
            .catch(err => console.log(err))

        });
    }
    
    render(){
        const lan = (this.state.language) ? this.state.language : 0;

        return(
            <Modal 
                title={language[lan].notification} 
                onHandleOk={this.onHandleOk} 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}>
                <NotificationForm 
                    onChange={(notification) => this.setState({notification: notification})}
                    classId={this.props.classId}
                    parentId={this.props.parentId}
                    notificationReply={this.props.notificationReply}/>
                
            </Modal>
        )
    }
}

export default NewNotificationModal