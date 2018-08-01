import React from 'react'
import Input from '../utils/Input'

class Add extends React.Component{
    constructor(props){
        super(props);

        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            email: ''
        }
    }

    handleRegister(){
        // sendLinkToEmail(this.state.email);
    }

    render(){
        return(
            <div>
                <Input 
                    className="form-item"
                    value={this.state.email}
                    type="text" 
                    label="email" 
                    onChange={(event) => this.setState({email: event.target.value})}
                />
                <button onClick={() => this.handleRegister()}>Registrar</button>
            </div>
        )
    }
}

export default Add