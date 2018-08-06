import React from 'react'
import { withRouter } from 'react-router'

import language from '../../language/language'
import {userByRole} from '../../functions/userByRole';
import Header from '../utils/Header'

class HomeStudent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps(){

    }

    render(){
        if(sessionStorage.length !== 0){
            userByRole()
            .then((result) => {
                console.log(result)
                if(result !== 'student') this.props.history.push('/login');
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
                <p>STUDENTSSS</p>
            </div>
        )
    }
}

export default withRouter(HomeStudent);