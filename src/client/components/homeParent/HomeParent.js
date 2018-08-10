import React from 'react'
import { withRouter } from 'react-router'

import language from '../../language/language'
import {userByRole} from '../../functions/userByRole';
import Header from '../utils/Header'
import { getStudentsParent, getStudentDossier } from '../../services/user';
import UserItem from '../utils/UserItem'
import DossierStudent from '../dossier/DossierStudent'

class HomeParent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0,
            students: {},
            student: null,
            studentId: 0
        }
    }

    componentWillMount(){
        if(sessionStorage.length !== 0){
            userByRole()
            .then((result) => {
                if(result !== 'parent') this.props.history.push('/login');
                getStudentsParent(sessionStorage.idUser)
                .then(result => this.setState({students: result, language: sessionStorage.language}))
                .catch(err => console.log(err))
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

    render(){
        const lan = this.state.language;
        return(
            <div>
                <Header/>
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
                                newNoteDossier={() => {}}/>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(HomeParent);