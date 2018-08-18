import React from 'react';
import { message } from 'antd';

import Box from '../utils/Box'
import Input from '../utils/Input'
import {post} from '../../services/user'

class Register extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          user: {},
          email: '',
          password: ''
        }
    }
    
    componentWillReceiveProps(){
        if(this.props.user){
          this.setState({user: this.props.user})
        }
    }

    handleRegister(){
      if(!this.state.email || !this.state.password){
        message.error('Incompleted fields');
        return;
      }

      let newUser = {
          email: this.state.email,
          password: this.state.password
      }
      post(newUser, 'admin')
      .then(result => {
        if(result.hasOwnProperty('msg'))
            message[result.type](result.msg)
      })
      .catch(err => console.log(err));
    }

    render(){
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
                onClick={() => this.handleRegister()}
              >Registrarse
              </button>
            </div>
          </Box>
        )
    }
}

export default Register;
