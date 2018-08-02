import React from 'react';
import { message } from 'antd';
import { withRouter } from 'react-router'

import Box from '../utils/Box'
import Input from '../utils/Input'
import {get, put} from '../../services/user'

class Register2 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          user: {},
          email: '',
          password: '',
          username: ''
        }
    }

    componentWillMount(){
        console.log(this.props.location.search.split('?'));
        let idU = this.props.location.search.split('?')[2];
        get(idU).then(result => {
            this.setState({email: result[0].email, user: result[0]})
        })
        .catch(err => this.props.history.push('/login'));
    }

    handleUpdated(){
      if(!this.state.email || !this.state.username || !this.state.password){
        message.error('Incompleted fields');
        return;
      }

      let newUser = {
          email: this.state.user.email,
          username: this.state.username,
          password: this.state.password,
          role: this.state.user.role,
      }
      put(newUser, this.state.user.id_users)
      .then(result => this.props.history.push('/login'))
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
              onChange={(event) => {}}
              disabled={true}
              />
            <Input 
              className="form-item"
              value={this.state.username}
              type="username" 
              label="username" 
              onChange={(event) => this.setState({username: event.target.value})}
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
                onClick={() => this.handleUpdated()}
              >Registrarse
              </button>
            </div>
          </Box>
        )
    }
}

export default withRouter(Register2);
