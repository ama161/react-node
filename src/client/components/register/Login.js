import React from 'react';
import { withRouter } from 'react-router'
import { message } from 'antd';

import Box from '../utils/Box'
import Input from '../utils/Input'
import language from '../../language/language'
import {login} from '../../services/login';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.state={
            email: '',
            password: '',
        }
    }

    handleLogin(){
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user)
        .then(result => {
            if(result.hasOwnProperty('msg')){
                message.error(result.msg);
            }
            else{
                sessionStorage.setItem('token', result.token);
                sessionStorage.setItem('idUser', result.idUser);
                this.props.history.push("/homeAdmin");
                console.log(result)
            }
        })
        .catch(err => console.log(err));
    }

    render(){
        const lan = 0;
        return(
            <Box>
                <Input 
                    className="form-item"
                    value={this.state.email}
                    type="text" 
                    label="email" 
                    onChange={(event) => this.setState({email: event.target.value})}
                />
                <Input 
                    className="form-item"
                    value={this.state.password}
                    type="password" 
                    label="password" 
                    onChange={(event) => this.setState({password: event.target.value})}
                />
                <div className="button-container">
                    <button 
                        className="button-border" 
                        onClick={() => this.handleLogin()}
                    >{language[lan].login}
                    </button>
                </div>
            </Box>
        )
    }
}

export default withRouter(Login)