import React from 'react'
import { withRouter } from 'react-router'

import ClassModal from '../class/ClassModal';
import StudentModal from '../student/StudentModal';
import TeacherModal from '../teacher/TeacherModal';
import {userByRole} from '../../functions/userByRole';

import MenuAdmin from './menu/MenuAdmin';
import ClassList from '../class/ClassList';
import SelectClass from '../utils/select/SelectClass';

import {getAll} from '../../services/class';
import {getStudentDossier} from '../../services/user'
import StudentList from '../student/StudentList';
import ParentModal from '../parent/ParentModal';
import TeacherList from '../teacher/TeacherList';
import ParentList from '../parent/ParentList';
import SubjectList from '../subject/SubjectList';
import SubjectModal from '../subject/SubjectModal';
import UserItem from '../utils/UserItem';
import DossierStudent from '../dossier/DossierStudent';

class HomeAdmin extends React.Component{
    constructor(props){
        super(props);

        this.state={
            user: '',
            newStudent: {},
            viewModalStudent: false,
            viewModalTeacher: false,
            viewModalParent: false,
            viewModalClass: false,
            viewClass: false,
            viewStudents: false,
            viewTeachers: false,
            viewParents: false,
            viewModalSubject: false,
            viewSubjects: false,
            language: 0,
            students: {},
            student: null,
            studentId: ''
        }
    }

    componentWillMount(){
        if(sessionStorage.length !== 0){
            userByRole()
            .then((result) => {
                if(result !== 'admin') this.props.history.push('/login');
            })
            .catch(() => {
                this.props.history.push('/login');
            })
        }else{
            this.props.history.push('/login')
        }
    }

    onStudentClick(id){
        getStudentDossier(id)
            .then(result => {
                this.setState({student: result, studentId: id})}
            ).catch(err => console.log('err'))
    }

    render(){
        return(
            <div className="homeAdmin-container-home">
                <MenuAdmin 
                    onHandleModalStudent={() => this.setState({viewModalStudent: true})}
                    onHandleModalTeacher={() => this.setState({viewModalTeacher: true})}
                    onHandleModalParent={() => this.setState({viewModalParent: true})}
                    onHandleModalClass={() => this.setState({viewModalClass: true})}
                    onHandleClass={() => this.setState({viewClass: true, viewStudents: false, viewTeachers: false, viewParents: false, viewSubjects: false})}
                    onHandleStudents={() => this.setState({viewStudents: true, viewClass: false, viewTeachers: false, viewParents: false, viewSubjects: false})}
                    onHandleTeachers={() => this.setState({viewTeachers: true, viewClass: false, viewStudents: false, viewParents: false, viewSubjects: false})}
                    onHandleParents={() => this.setState({viewParents: true, viewClass: false, viewStudents: false, viewTeachers: false, viewSubjects: false})}
                    onChangeLanguage={(language) => this.setState({language: language})}
                    onHandleModalSubject={() => this.setState({viewModalSubject: true})}
                    onHandleSubject={() => this.setState({viewSubjects: true, viewParents: false, viewClass: false, viewStudents: false, viewTeachers: false})}/>
                    
                <div className="homeAdmin-container-info">
                    
                    {this.state.student && this.state.studentId
                        ?   <DossierStudent 
                                student={this.state.student} 
                                visible={(this.state.studentId) ? true : false}
                                onHandleCancel={() => this.setState({studentId: '', student: null})}
                                newNoteDossier={() => {}}/>
                        : null
                    }

                    { this.state.viewModalClass
                        ? <ClassModal visible={this.state.viewModalClass} onHandleCancel={() => this.setState({viewModalClass: false})}/>
                        : null
                    }

                    { this.state.viewModalStudent
                        ? <StudentModal visible={this.state.viewModalStudent} onHandleCancel={() => this.setState({viewModalStudent: false})}/>
                        : null
                    }

                    { this.state.viewModalTeacher
                        ? <TeacherModal visible={this.state.viewModalTeacher} onHandleCancel={() => this.setState({viewModalTeacher: false})}/>
                        : null
                    }

                    { this.state.viewModalParent
                        ? <ParentModal visible={this.state.viewModalParent} onHandleCancel={() => this.setState({viewModalParent: false})}/>
                        : null
                    }

                    { this.state.viewClass
                        ? <div>
                            <ClassList onClassClick={(students) => this.setState({students: students})}/>
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
                        : null
                    }

                    { this.state.viewStudents
                        ? <StudentList onStudentClick={(id) => this.onStudentClick(id)}/>
                        : null
                    }

                    { this.state.viewParents
                        ? <ParentList/>
                        : null
                    }

                    { this.state.viewTeachers
                        ? <TeacherList/>
                        : null
                    }

                    { this.state.viewModalSubject
                        ? <SubjectModal visible={this.state.viewModalSubject} onHandleCancel={() => this.setState({viewModalSubject: false})}/>
                        : null
                    }

                    { this.state.viewSubjects
                        ? <SubjectList/>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(HomeAdmin);