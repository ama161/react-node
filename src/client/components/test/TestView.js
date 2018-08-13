import React from 'react';
import { message } from 'antd';

import TestForm from './TestForm';
import Header from '../utils/Header';
import language from '../../language/language'
import QuestionItem from '../question/QuestionItem';
import { post } from '../../services/test';
import TestList from './TestList';

class TestView extends React.Component{
    constructor(props){
        super(props);


        this.state = {
            language: 0,
            questions: [],
            newTest: {},
            testForm: false,
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    onHandleTest(){
        console.log(this.state)
        let newTest = {
            questions: this.state.questions,
            title: this.state.newTest.title,
            description: this.state.newTest.description
        }

        console.log(newTest);
        post(newTest)
        .then(result => {
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
            this.setState({testForm: !this.state.testForm})
        })
        .catch(err => console.log(err))
    }

    render(){
        const lan = this.state.language
        return(
            <div>
                <Header onChangeLanguage={(language) => this.setState({language: language})}/>
                {this.state.testForm
                    ? <div>
                        <TestForm 
                            onAddQuestion={(question) => {
                                this.setState({questions: this.state.questions.concat([question])})
                            }}
                            onChangeTest={(newTest) => this.setState({newTest: newTest})}/>
                            
                        <div className="testView-questions">
                            {this.state.questions.map((key, index) => 
                                <QuestionItem disabled={true} checked={true} id_question={key}/>
                            )}
                        </div>
                        
                        <div className="testView-button">
                            <button key="submit" class="ant-btn ant-btn-primary" onClick={() => this.onHandleTest()}>
                                {language[lan].addTest}
                            </button>
                            <button key="submit" class="ant-btn ant-btn-primary" onClick={() => this.setState({testForm: !this.state.testForm})}>
                                {language[lan].cancel}
                            </button>
                        </div>
                    </div>
                    : <div>
                        <button key="submit" class="ant-btn ant-btn-primary" onClick={() => this.setState({testForm: !this.state.testForm})}>
                            {language[lan].addTest}
                        </button>
                        <TestList/>
                    </div>
                }
                
            </div>
        )
    }
}

export default TestView;