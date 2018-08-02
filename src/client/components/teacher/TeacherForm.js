import React from 'react'
import Input from '../utils/Input'

class TeacherForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
        }
    }

    render(){
        return(
            <div>
                <Input 
                    className="form-item"
                    value={this.state.email}
                    type="text" 
                    label="email" 
                    onChange={(event) => 
                        this.setState({email: event.target.value}
                        , () => {
                            this.props.onHandleChange(this.state)
                        })
                    }
                />
            </div>
        )
    }
}

export default TeacherForm