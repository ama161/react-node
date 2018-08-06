import React from 'react'
import { withRouter } from 'react-router'

import language from '../../language/language'
import {userByRole} from '../../functions/userByRole';
import Header from '../utils/Header'
import {getByRole} from '../../services/user'
import ParentInfoModal from './ParentInfoModal'

class HomeStudent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0,
            student: null,
            viewModalParent: false,
        }
    }

    componentWillMount(){
        console.log(sessionStorage)
        if(sessionStorage.length !== 0){
            userByRole()
            .then((result) => {
                console.log('result' + result)
                if(result !== 'student') this.props.history.push('/login');
                else
                    getByRole(sessionStorage.idUser, 'student')
                        .then(result => this.setState({student: result[0]}))
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

    render(){
        const lan = this.state.language;
        return(
            <div>
                {this.state.viewModalParent
                    ? <ParentInfoModal 
                        visible={this.state.viewModalParent} 
                        onHandleCancel={() => this.setState({viewModalParent: false})}
                        id_student={this.state.student.id_student}/>
                    : null
                }
                <Header onChangeLanguage={(language) => this.setState({language: language})}/>
                <div className="container-info">
                    <p id="student_icon" className={(this.state.student) ? "icon " + this.state.student.student_icon : null}></p>
                    <div className="container-info-data">
                        <h1>{(this.state.student) ? this.state.student.student_name : null}</h1>
                        <div className="container-info-data-class">
                            <h2>
                                {(this.state.student) ? this.state.student.class_name : null}
                            </h2>
                            <p className={(this.state.student) ? "icon " + this.state.student.class_icon : null}></p>                            
                        </div>
                        <p className="container-info-data-parent" onClick={() => this.setState({viewModalParent: true})}>{language[lan].infoParent}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HomeStudent);