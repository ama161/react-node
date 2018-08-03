import React from 'react'
import { withRouter } from 'react-router'

import language from '../../language/language'
import ClassModal from '../class/ClassModal';
import StudentModal from '../student/StudentModal';
import TeacherModal from '../teacher/TeacherModal';
import {userByRole} from '../../functions/userByRole';

import MenuAdmin from './menu/MenuAdmin';
import ClassList from '../class/ClassList';

class HomeAdmin extends React.Component{
    constructor(props){
        super(props);

        this.state={
            user: '',
            language: 0,
            newStudent: {},
            viewModalStudent: false,
            viewModalTeacher: false,
            viewModalParent: false,
            viewModalClass: false,
            viewClass: false,
            viewUsers: false,
            class: {}
        }
    }

    componentWillMount(){
        userByRole()
        .then(role => {
            if(role !== 'admin'){
                this.props.history.push("/login")
            }
        });
    }

    componentWillReceiveProps(){
        console.log('HOME ADMIN componentWillReceiveProps')
    }

    render(){
        let lan = 0;
        
        return(
            <div className="homeAdmin-container-home">
                <MenuAdmin 
                    onHandleModalStudent={() => this.setState({viewModalStudent: true})}
                    onHandleModalTeacher={() => this.setState({viewModalTeacher: true})}
                    onHandleModalParent={() => this.setState({viewModalParent: true})}
                    onHandleModalClass={() => this.setState({viewModalClass: true})}
                    onHandleClass={() => this.setState({viewClass: true, viewUsers: false})}
                    onHandleUsers={() => this.setState({viewUsers: true, viewClass: false})}/>
                    
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

                    {this.state.viewClass
                        ? <ClassList/>
                        : null
                    }

                    {this.state.viewUsers
                        ? <p>USERS</p>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(HomeAdmin);