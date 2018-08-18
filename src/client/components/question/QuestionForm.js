import React from 'react';
import language from '../../language/language'
import Input from '../utils/Input'
import SelectSubject from '../utils/select/SelectSubject';

class QuestionForm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            title: '',
            response_true: '',
            response_false_1: '',
            response_false_2: '',
            subject: 0,
            language: 0
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})        
    }

    onChangeSubject(value){
        this.setState({subject: value}
            , () => {
                this.props.onChangeQuestion(this.state)
            })
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value}
            , () => {
                this.props.onChangeQuestion(this.state)
            })
    }

    render(){
        const lan = this.state.language
        return(
            <div>
                <Input 
                    className="form-item"
                    value={this.state.title}
                    type="text" 
                    name="title"
                    label={language[lan].title} 
                    onChange={(event) => this.onChange(event)}
                />
                <Input 
                    className="form-item"
                    value={this.state.response_true}
                    type="text" 
                    name="response_true"
                    label={language[lan].responseTrue} 
                    onChange={(event) => this.onChange(event)}
                />
                <Input 
                    className="form-item"
                    value={this.state.response_false_1}
                    type="text" 
                    name="response_false_1"
                    label={language[lan].responseFalse + ' 1'} 
                    onChange={(event) => this.onChange(event)}
                />
                <Input 
                    className="form-item"
                    value={this.state.response_false_2}
                    type="text" 
                    name="response_false_2"
                    label={language[lan].responseFalse + ' 2'} 
                    onChange={(event) => this.onChange(event)}
                />
                <div className="form-item">
                    <label>{language[lan].subject}</label>
                    <SelectSubject onHandleChange={(value) => this.onChangeSubject(value)}/>
                </div>
            </div>
        )
    }
}

export default QuestionForm;