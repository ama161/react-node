import React from 'react'
import { withRouter } from 'react-router'

import language from '../../language/language'
import {userByRole} from '../../functions/userByRole';
import Header from '../utils/Header'
import { getStudentsParent } from '../../services/user';

class HomeParent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0
        }
    }

    componentWillMount(){
        if(sessionStorage.length !== 0){
            userByRole()
            .then((result) => {
                if(result !== 'parent') this.props.history.push('/login');
                getStudentsParent(sessionStorage.idUser)
                .then(result => console.log(result))
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
                <p>PARENTSS</p>
            </div>
        )
    }
}

export default withRouter(HomeParent);