import React from 'react';
import Input from '../utils/Input';
import language from '../../language/language'
import SelectClass from '../utils/select/SelectClass';
import SelectSubject from '../utils/select/SelectSubject';
import SelectStudentByClass from '../utils/select/SelectStudentByClass';

class ExamForm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            description: '',
            language: 0,
            classId:'',
            subjectId: ''
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    onChangeClass(event){
        this.setState({classId: event}, () => this.props.onNewAssistance(this.state))
    }

    onChangeSubject(event){
        this.setState({subjectId: event}, () => this.props.onNewAssistance(this.state))        
    }

    render(){
        const lan = this.state.language
        return(
            <div>
                <Input 
                    className="form-item"
                    value={this.state.description}
                    type="text" 
                    label={language[lan].description}
                    onChange={(event) => 
                        this.setState({description: event.target.value},
                        () => this.props.onNewAssistance(this.state))
                    }
                />
                <div className="form-item">
                    <label>{language[lan].class}</label>
                    <SelectClass onHandleChange={(value) => this.onChangeClass(value)}/>
                </div>

                <div className="form-item">
                    <label>{language[lan].subject}</label>
                    <SelectSubject onHandleChange={(value) => this.onChangeSubject(value)}/>
                </div>
            </div>
        )
    }
}

export default ExamForm;