import React from 'react';
import Input from '../utils/Input'
import AvatarsContent from '../utils/AvatarsContent';
import language from '../../language/language'

class StudentForm extends React.Component{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onHandleAvatar = this.onHandleAvatar.bind(this);

        this.state={
            name: '',
            email: '',
            icon: ''
        }
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value}
            , () => {
                this.props.onChangeStudent(this.state)
            })
    }

    onHandleAvatar(avatar){
        this.setState({icon: avatar}
            , () => {
                this.props.onChangeStudent(this.state)
            })
    }

    render(){
        const lan = 0;
        return(
            <div>
                <AvatarsContent onHandleClick={(avatar) => this.onHandleAvatar(avatar)}/>
                <Input 
                    className="form-item"
                    value={this.state.name}
                    type="text" 
                    label={language[lan].name} 
                    onChange={(event) => this.onChange(event)}
                    name="name"
                />
                <Input 
                    className="form-item"
                    value={this.state.email}
                    type="text" 
                    label={language[lan].email}  
                    onChange={(event) => this.onChange(event)}
                    name="email"
                />
            </div>
        )
    }
}

export default StudentForm;