import React from 'react';
import Input from '../utils/Input';
import language from '../../language/language'
import SelectClass from '../utils/select/SelectClass';
import SelectStudentByClass from '../utils/select/SelectStudentByClass';

class AssistanceForm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            description: '',
            language: 0,
            classId:'',
            studentId: ''
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    onChangeClass(event){
        this.setState({classId: event}, () => this.props.onNewAssistance(this.state))
    }

    onChangeStudent(event){
        this.setState({studentId: event}, () => this.props.onNewAssistance(this.state))        
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
                {this.state.classId
                    ? <div className="form-item">
                        <label>{language[lan].student}</label>
                        <SelectStudentByClass 
                            onHandleChange={(value) => this.onChangeStudent(value)}
                            classId={this.state.classId}/>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default AssistanceForm;