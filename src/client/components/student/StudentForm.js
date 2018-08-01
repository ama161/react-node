import React from 'react';
import Input from '../utils/Input'
import AvatarsContent from '../utils/AvatarsContent';
import language from '../../language/language'

class StudentForm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            name: '',
            email: ''
        }
    }

    render(){
        const lan = 0;
        return(
            <div>
                <AvatarsContent/>
                <Input 
                    className="form-item"
                    value={this.state.name}
                    type="text" 
                    label={language[lan].name} 
                    onChange={(event) => this.setState({name: event.target.value})}
                />
                <Input 
                    className="form-item"
                    value={this.state.email}
                    type="text" 
                    label={language[lan].email}  
                    onChange={(event) => this.setState({email: event.target.value})}
                />
            </div>
        )
    }
}

export default StudentForm;