import React from 'react';
import { message } from 'antd';

import Box from '../utils/Box'
import Input from '../utils/Input'
import {post} from '../../services/center'

class CenterForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          name: '',
        }
    }

    handleRegister(){
      if(!this.state.name){
        message.error('Incompleted fields');
        return;
      }

      let newCenter = {
          name: this.state.name,
      }
      post(newCenter)
      .then(result => {
          console.log(result)
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
              value={this.state.name}
              type="text" 
              label="name" 
              onChange={(event) => this.setState({name: event.target.value})}
              />
            <div className="button-container">
              <button 
                className="button-border" 
                onClick={() => this.handleRegister()}
              >Registrar Centro
              </button>
            </div>
          </Box>
        )
    }
}

export default CenterForm;
