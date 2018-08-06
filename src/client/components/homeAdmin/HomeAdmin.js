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
import StudentList from '../student/StudentList';
import ParentModal from '../parent/ParentModal';
import TeacherList from '../teacher/TeacherList';
import ParentList from '../parent/ParentList';

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
            language: 0,
        }
    }

    render(){
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

        return(
            <div className="homeAdmin-container-home">
                <MenuAdmin 
                    onHandleModalStudent={() => this.setState({viewModalStudent: true})}
                    onHandleModalTeacher={() => this.setState({viewModalTeacher: true})}
                    onHandleModalParent={() => this.setState({viewModalParent: true})}
                    onHandleModalClass={() => this.setState({viewModalClass: true})}
                    onHandleClass={() => this.setState({viewClass: true, viewStudents: false, viewTeachers: false, viewParents: false})}
                    onHandleStudents={() => this.setState({viewStudents: true, viewClass: false, viewTeachers: false, viewParents: false})}
                    onHandleTeachers={() => this.setState({viewTeachers: true, viewClass: false, viewStudents: false, viewParents: false})}
                    onHandleParents={() => this.setState({viewParents: true, viewClass: false, viewStudents: false, viewTeachers: false})}
                    onChangeLanguage={(language) => this.setState({language: language})}/>
                    
                <div className="homeAdmin-container-info">
                    
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
                        ? <ClassList/>
                        : null
                    }

                    { this.state.viewStudents
                        ? <StudentList/>
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
                </div>
            </div>
        )
    }
}

export default withRouter(HomeAdmin);