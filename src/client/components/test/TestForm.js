import React from 'react';
import language from '../../language/language'
import Input from '../utils/Input'
import QuestionModal from '../question/QuestionModal';
import SelectQuestion from '../utils/select/SelectQuestion';
import SelectSubject from '../utils/select/SelectSubject';

class TestForm extends React.Component{
    constructor(props){
        super(props);

        this.onHandleTest = this.onHandleTest.bind(this);

        this.state={
            title: '',
            description: '',
            viewModalQuestion: false,
            question: '',
            subjectId: '',
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value}
            , () => {
                this.props.onChangeTest({title: this.state.title, description: this.state.description})
            })
    }

    onChangeQuestion(value){
        this.setState({question: value}
            , () => {
                this.props.onChangeTest({title: this.state.title, description: this.state.description})
            })
    }

    onChangeSubject(value){
        this.setState({subjectId: value})
    }

    onHandleTest(){
        this.props.onHandleTest(this.state)
    }
    
    render(){
        const lan = this.state.language;
        return(
            <div className="testForm-container">
                {this.state.viewModalQuestion
                    ? <QuestionModal visible={this.state.viewModalQuestion} onHandleCancel={() => this.setState({viewModalQuestion: false})}/>
                    : null
                }
                <div className="testForm-container-formTest">
                    <Input 
                        className="form-item"
                        value={this.state.title}
                        type="text" 
                        label={language[lan].title}  
                        onChange={(event) => this.onChange(event)}
                        name="title"
                    />
                    <Input 
                        className="form-item"
                        value={this.state.description}
                        type="text" 
                        label={language[lan].description}  
                        onChange={(event) => this.onChange(event)}
                        name="description"
                    />
                </div>
                <div className="testForm-container-formQuestion">
                    <div className="form-item">
                        <div className="form-item">
                            <label>{language[lan].subject}</label>
                            <SelectSubject onHandleChange={(value) => this.onChangeSubject(value)}/>
                        </div>
                        {this.state.subjectId
                            ?<div className="addQuestion">
                                <div className="form-item">
                                    <label>{language[lan].question}</label>
                                    <SelectQuestion subjectId={this.state.subjectId} onHandleChange={(value) => this.onChangeQuestion(value)}/>
                                </div>
                                
                                <button key="submit" class="ant-btn ant-btn-primary" 
                                    onClick={() => {
                                        this.props.onAddQuestion(this.state.question); 
                                        this.setState({question: ''})
                                    }}>
                                    {language[lan].addQuestion}
                                </button>
                            </div>
                            : null
                        }
                    </div>
                    <button key="submit" class="ant-btn ant-btn-primary" onClick={() => this.setState({viewModalQuestion: true})}>
                        {language[lan].newQuestion}
                    </button>
                </div>
            </div>
        )
    }
}

export default TestForm;