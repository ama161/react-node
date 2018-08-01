import React from 'react'
import { withRouter } from 'react-router'

import language from '../../language/language'
import Header from '../utils/Header';
import Modal from '../utils/Modal';
import ClassForm from '../class/ClassForm';
import StudentForm from '../student/StudentForm';
import {userByRole} from '../../functions/userByRole';

class HomeAdmin extends React.Component{
    constructor(props){
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.state={
            user: '',
            language: 0
        }
    }

    componentWillMount(){
        // if(this.props.language){
        //     this.setState({language: this.props.language})
        // }
        userByRole()
        .then(role => {
            if(role !== 'admin'){
                console.log(this.props.history);
                this.props.history.push("/login")
            }
        });
    }

    componentWillReceiveProps(nextProps){
        // if(nextProps.language){
        //     this.setState({language: nextProps.language})
        // }
    }

    handleLogout(){
        // this.props.logout(this.props.history)
    }

    render(){
        let lan = 0;
        
        return(
            <div>
                <Header/>
                <h1>Welcome Admin!!!</h1> 
                <Modal title={language[lan].addClass}>
                    <ClassForm/>
                </Modal>
                <Modal title={language[lan].addStudents}>
                    <StudentForm/>
                </Modal>           
                <div>
                    <button className="button-fill" onClick={() => this.props.history.push("/add")}>{language[lan].addTeachers}</button>
                </div>
            </div>
        )
    }
}

export default withRouter(HomeAdmin);