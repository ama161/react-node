import React from 'react';
import Input from '../utils/Input'
import language from '../../language/language';

class SubjectForm extends React.Component{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state={
            name: '',
            language: 0,
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value}
            , () => {
                this.props.onChangeSubject(this.state)
            })
    }

    render(){
        const lan = this.state.language;
        return(
            <div>
                <Input 
                    className="form-item"
                    value={this.state.name}
                    type="text" 
                    label={language[lan].name}  
                    onChange={(event) => this.onChange(event)}
                    name="name"
                />
            </div>
        )
    }
}

export default SubjectForm;