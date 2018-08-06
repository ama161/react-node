import React from 'react'
import { withRouter } from 'react-router'

import language from '../../language/language'
import {userByRole} from '../../functions/userByRole';
import Header from '../utils/Header'
import {getClassTeacher} from '../../services/class';
import ClassItem from '../class/ClassItem';
import UserItem from '../utils/UserItem';
import {getStudentsByClass} from '../../services/user'

class HomeTeacher extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0,
            class: {},
            students: {}
        }
    }

    componentWillMount(){
        let idTeacher = sessionStorage.idUser;
        getClassTeacher(idTeacher)
        .then(result => this.setState({class: result}));
    }

    componentWillReceiveProps(){
        let idTeacher = sessionStorage.idUser;
        getClassTeacher(idTeacher)
        .then(result => this.setState({class: result}));
    }

    onClassClick(id){
        getStudentsByClass(id)
        .then((result) => {this.setState({students: result})})
    }

    render(){
        if(sessionStorage.length !== 0){
            userByRole()
            .then((result) => {
                if(result !== 'teacher') this.props.history.push('/login');
            })
            .catch(() => {
                this.props.history.push('/login');
            })
        }else{
            this.props.history.push('/login')
        }

        return(
            <div>
                <Header/>
                <div className="classList-container">
                    {Object.values(this.state.class).map((key, index) => 
                        <ClassItem name={key.name} icon={key.icon} id={key.id_class} onHandleClick={(id) => this.onClassClick(id)}/>
                    )}
                </div>

                <div>
                    {this.state.students
                        ? <div className="usersList-container">
                            {Object.values(this.state.students).map((key, index) => 
                                <UserItem name={key.username} icon={key.icon}/>
                            )}
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(HomeTeacher);