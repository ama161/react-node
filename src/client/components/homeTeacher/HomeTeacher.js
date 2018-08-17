import React from 'react'
import { withRouter } from 'react-router'

import language from '../../language/language'
import {userByRole} from '../../functions/userByRole';
import Header from '../utils/Header'
import {getClassTeacher} from '../../services/class';
import ClassItem from '../class/ClassItem';
import UserItem from '../utils/UserItem';
import {getStudentsByClass, getStudentDossier} from '../../services/user'
import DossierStudent from '../dossier/DossierStudent'
import NoteDossierModal from '../dossier/NoteDossierModal';
import CalendarTeacher from './CalendarTeacher';
import { getByTeacher } from '../../services/notification';

class HomeTeacher extends React.Component{
    constructor(props){
        super(props);

        this.onStudentClick = this.onStudentClick.bind(this);
        this.state={
            language: 0,
            class: {},
            students: {},
            student: null,
            studentId: 0,
            viewNoteDossierModal: false,
            viewCalendar: false,
            notifications: [],
        }
    }

    componentWillMount(){
        if(sessionStorage.length !== 0){
            userByRole()
            .then((result) => {
                if(result !== 'teacher') this.props.history.push('/login');
                else{
                    let idTeacher = sessionStorage.idUser;
                    getClassTeacher(idTeacher)
                    .then(result => this.setState({class: result, language: sessionStorage.language}));
                }
            })
            .catch(() => {
                this.props.history.push('/login');
            })
        }else{
            this.props.history.push('/login')
        }
    }

    componentWillReceiveProps(){
        let idTeacher = sessionStorage.idUser;
        getClassTeacher(idTeacher)
        .then(result => this.setState({class: result, language: sessionStorage.language}));
        getByTeacher(sessionStorage.idUser)
        .then(result => this.setState({notifications: result}))
    }

    onClassClick(id){
        getStudentsByClass(id)
        .then((result) => {this.setState({students: result, studentId: 0, student: null})})
    }

    onStudentClick(id){
        getStudentDossier(id)
            .then(result => {
                console.log(result);
                this.setState({student: result, studentId: id})}
            ).catch(err => console.log('err'))
    }

    render(){
        const lan = this.state.language
        return(
            <div className="homeTeacher-container">
                {this.state.viewNoteDossierModal
                    ? <NoteDossierModal 
                        visible={this.state.viewNoteDossierModal}
                        id_student={this.state.studentId}
                        id_teacher={sessionStorage.idUser}
                        onHandleCancel={() => {
                            console.log('onHandleCancel')
                            this.setState({viewNoteDossierModal: false})
                            this.onStudentClick(this.state.studentId)
                        }}/>
                    : null
                }
                <Header onChangeLanguage={(language) => this.setState({language: language})}/>
                <div className="homeTeacher-container-buttons">
                    <button 
                        class="ant-btn ant-btn-primary" 
                        onClick={() => this.props.history.push('/homeTeacher/test')}>
                        {language[lan].test}
                    </button>
                    <button 
                        class="ant-btn ant-btn-primary" 
                        onClick={() => this.setState({viewCalendar: !this.state.viewCalendar})}>
                        {language[lan].calendar}
                    </button>
                </div>
                <div className="notifications-container">
                    {this.state.notifications.map(item =>
                        <Alert message={item.description + ' - ' + item.username} type="info" showIcon closable/>
                    )}
                </div>
                {this.state.viewCalendar
                    ? <CalendarTeacher/>
                    : null
                }
                <div className="classList-container">
                    {Object.values(this.state.class).map((key, index) => 
                        <ClassItem name={key.name} icon={key.icon} id={key.id_class} onHandleClick={(id) => this.onClassClick(id)}/>
                    )}
                </div>

                <div>
                    {this.state.students
                        ? <div className="usersList-container">
                            {Object.values(this.state.students).map((key, index) => 
                                <UserItem 
                                    name={key.username} 
                                    icon={key.icon} 
                                    onStudentClick={(id) => this.onStudentClick(id)}
                                    id={key.id_student}/>
                            )}
                        </div>
                        : null
                    }
                </div>

                <div className="homeTeacher-container-dossier">
                    {this.state.student && this.state.studentId
                        ?   <DossierStudent 
                                student={this.state.student} 
                                visible={(this.state.studentId) ? true : false}
                                onHandleCancel={() => this.setState({studentId: ''})}
                                newNoteDossier={() => this.setState({viewNoteDossierModal: true})}/>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(HomeTeacher);