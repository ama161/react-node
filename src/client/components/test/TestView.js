import React from 'react';
import TestForm from './TestForm';
import Header from '../utils/Header';
import QuestionItem from '../question/QuestionItem';

class TestView extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            language: 0,
            questions: []
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    render(){
        const lan = this.state.language
        return(
            <div>
                <Header onChangeLanguage={(language) => this.setState({language: language})}/>
                <TestForm 
                onAddQuestion={(question) => {
                    this.setState({questions: this.state.questions.concat([question])})
                }}
                onChangeTest={() => {}}/>
                <div className="testView-questions">
                    {this.state.questions.map((key, index) => 
                        <QuestionItem id_question={key}/>
                    )}
                </div>
            </div>
        )
    }
}

export default TestView;