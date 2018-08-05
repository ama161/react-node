import React from 'react';
import Input from '../utils/Input'
import AvatarsContent from '../utils/AvatarsContent';
import language from '../../language/language';
import SelectClass from '../utils/select/SelectClass';

class StudentForm extends React.Component{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onHandleAvatar = this.onHandleAvatar.bind(this);
        this.onChangeClass = this.onChangeClass.bind(this);

        this.state={
            username: '',
            email: '',
            icon: '',
            class: '',
            language: 0,
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
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

    onChangeClass(event){
        this.setState({class: event}
            , () => {
                this.props.onChangeStudent(this.state)
            })
    }

    render(){
        const lan = this.state.language;
        return(
            <div>
                <AvatarsContent onHandleClick={(avatar) => this.onHandleAvatar(avatar)}/>
                <Input 
                    className="form-item"
                    value={this.state.username}
                    type="text" 
                    label={language[lan].name} 
                    onChange={(event) => this.onChange(event)}
                    name="username"
                />
                <Input 
                    className="form-item"
                    value={this.state.email}
                    type="text" 
                    label={language[lan].email}  
                    onChange={(event) => this.onChange(event)}
                    name="email"
                />
                <div className="form-item">
                    <label>{language[lan].class}</label>
                    <SelectClass onHandleChange={(value) => this.onChangeClass(value)}/>
                </div>
            </div>
        )
    }
}

export default StudentForm;