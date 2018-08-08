import React from 'react';
import language from '../../language/language'
import Input from '../utils/Input'
import QuestionModal from '../question/QuestionModal';
import SelectQuestion from '../utils/select/SelectQuestion';

class TestForm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            title: '',
            description: '',
            viewModalQuestion: false,
            question: ''
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value}
            , () => {
                this.props.onChangeTest(this.state)
            })
    }

    onChangeQuestion(value){
        console.log(value)
        this.setState({question: value}
            , () => {
                this.props.onChangeTest(this.state)
            })
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
                        <label>{language[lan].question}</label>
                        <SelectQuestion onHandleChange={(value) => this.onChangeQuestion(value)}/>
                    </div>
                    <button key="submit" class="ant-btn ant-btn-primary" onClick={() => this.setState({viewModalQuestion: true})}>
                        {language[lan].addQuestion}
                    </button>
                </div>
            </div>
        )
    }
}

export default TestForm;