import React from 'react'
import { withRouter } from 'react-router'

import language from '../../language/language'
import {userByRole} from '../../functions/userByRole';
import Header from '../utils/Header'
import { getStudentsParent } from '../../services/user';
import UserItem from '../utils/UserItem'

class HomeParent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0,
            students: {}
        }
    }

    componentWillMount(){
        if(sessionStorage.length !== 0){
            userByRole()
            .then((result) => {
                if(result !== 'parent') this.props.history.push('/login');
                getStudentsParent(sessionStorage.idUser)
                .then(result => this.setState({students: result}))
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

    render(){
        return(
            <div>
                <Header/>
                <div className="usersList-container">
                    {Object.values(this.state.students).map((key, index) => 
                        <UserItem name={key.username} icon={key.icon} onStudentClick={() => {}}/>
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(HomeParent);