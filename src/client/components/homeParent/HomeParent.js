import React from 'react'
import { Alert, message} from 'antd';
import { withRouter } from 'react-router'

import language from '../../language/language'
import {userByRole} from '../../functions/userByRole';
import Header from '../utils/Header'
import { getStudentsParent, getStudentDossier } from '../../services/user';
import UserItem from '../utils/UserItem'
import DossierStudent from '../dossier/DossierStudent'
import CalendarParent from './CalendarParent';
import NewNotificationModal from '../notification/NewNotificationModal';
import { getByParent, deleteNotification } from '../../services/notification';

class HomeParent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0,
            students: {},
            student: null,
            studentId: 0,
            viewCalendar: false,
            notifications: [],
            notificationsInfo:[],
            newNotification: false,
            viewModalReply: false,
            notificationReply: null,
        }
    }

    componentWillMount(){
        if(sessionStorage.length !== 0){
            userByRole()
            .then((result) => {
                if(result !== 'parent') this.props.history.push('/login');
                getStudentsParent(sessionStorage.idUser)
                .then(result => {
                    this.setState({students: result.students, notifications: result.notifications, language: sessionStorage.language})
                })
                .catch(err => console.log(err))
                getByParent(sessionStorage.idUser)
                .then(result => this.setState({notificationsInfo: result}))
            })
            .catch((err) => {
                console.log(err)
                this.props.history.push('/login');
            })
        }else{
            this.props.history.push('/login')
        }
    }

    componentWillReceiveProps(){

    }

    onStudentClick(id){
        getStudentDossier(id)
            .then(result => {
                this.setState({student: result, studentId: id})}
            )
    }

    handleClose(item){
        this.setState({viewModalReply: true, notificationReply:item})
        deleteNotification(item.id_student, item.description)
        .then(result => {
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
        })
        .catch(err => console.log(err))
    }

    render(){
        const lan = this.state.language;
        return(
            <div>
                {this.state.viewModalReply
                    ? <NewNotificationModal 
                        visible={this.state.viewModalReply}
                        notificationReply={this.state.notificationReply}
                        classId={this.state.notificationReply.id_class}
                        onHandleCancel={() => {
                            this.setState({viewModalReply: false})
                        }}/>
                    : null
                }
                {this.state.newNotification
                    ? <NewNotificationModal 
                        studentId={this.state.studentId}
                        classId={this.state.student.student[0].id_class}
                        visible={this.state.newNotification}
                        onHandleCancel={() => {
                            this.setState({newNotification: false})
                            this.onStudentClick(this.state.studentId)
                        }}/>
                    : null
                }
                <Header/>
                <button 
                    class="ant-btn ant-btn-primary" 
                    onClick={() => this.setState({viewCalendar: !this.state.viewCalendar})}>
                    {language[lan].calendar}
                </button>
                <div className="notifications-container">
                    {this.state.notifications.map(item =>
                        <Alert message={item.username + ' ' + item.name + ' ' + item.title + ' -> ' + item.note} type="warning" showIcon closable/>
                    )}
                    <Alert 
                        message={language[lan].deleteMessage} 
                        type="error" 
                        showIcon 
                        closable/>
                    {this.state.notificationsInfo.map(item =>
                        // <Alert message={item.description + ' - ' + item.username} type="info" showIcon closable/>
                        <Alert 
                            message={item.description + ' - ' + item.username} 
                            type="info" 
                            showIcon 
                            closeText={language[lan].reply} 
                            afterClose={() => this.handleClose(item)}/>
                    )}
                </div>
                {this.state.viewCalendar
                    ? <CalendarParent/>
                    : null
                }
                <div className="usersList-container">
                    {Object.values(this.state.students).map((key, index) => 
                        <UserItem 
                            name={key.username} 
                            icon={key.icon} 
                            onStudentClick={(id) => this.onStudentClick(id)}
                            id={key.id_student}/>
                    )}
                </div>

                <div className="homeTeacher-container-dossier">
                    {this.state.student && this.state.studentId
                        ?   <DossierStudent 
                                student={this.state.student} 
                                visible={(this.state.studentId) ? true : false}
                                onHandleCancel={() => this.setState({studentId: ''})}
                                newNoteDossier={() => {}}
                                newNotification={() => this.setState({newNotification: true})}/>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(HomeParent);