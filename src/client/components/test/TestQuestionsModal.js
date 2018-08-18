import React from 'react';
import { Steps, Icon } from 'antd';

import Modal from '../utils/Modal';
import language from '../../language/language'
import { get } from '../../services/test';

const Step = Steps.Step;

class TestQuestionsModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.state={
            viewModal: false,
            language: 0,
            questions: [],
            stepCurrent: 0,
            trueQuestions: [],
            responseSelected: '',
        }
    }

    componentWillMount(){
        get(this.props.testId)
        .then(result => {
            this.setState({
                viewModal: this.props.visible, 
                language: sessionStorage.language, 
                questions: result.questions
            })
        })
    }

    componentWillReceiveProps(nextProps){
        get(nextProps.testId)
        .then(result => {
            this.setState({
                viewModal: nextProps.visible, 
                language: sessionStorage.language, 
                questions: result.questions,
                stepCurrent: 0,
                trueQuestions: [],
                responseSelected: '',
            })
        })        
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    handleResponse(idQuestion, type, response){
        let array = this.state.trueQuestions;
        
        array.push({id_question: idQuestion, correct: type})
        this.setState({
            trueQuestions: array, 
            responseSelected: '', 
            stepCurrent: (this.state.stepCurrent + 1 < this.state.questions.length) ? this.state.stepCurrent+1 : this.state.stepCurrent
        }) 

        if(this.state.trueQuestions.length === this.state.questions.length){
            this.setState({viewModal: false});
            this.props.onFinishTest(this.state.trueQuestions);
        }
    }

    answers(response_true, response_false_1, response_false_2, id_question){
        let arrayAnswer = []
        arrayAnswer.push(
            {answer: response_true, id: 0, question: id_question}, 
            {answer: response_false_1, id: 1, question: id_question}, 
            {answer: response_false_2, id: 2, question: id_question});
        let arrayRandom = [];

        for(let i = 0; i <= arrayAnswer.length; i++){
            let random = Math.floor((Math.random() * (arrayAnswer.length - 1)) + 0)

            arrayRandom.push(arrayAnswer[random])
            arrayAnswer.splice(random, 1);
        }
        arrayRandom.push(arrayAnswer[0])
        return arrayRandom;
    }

    render(){
        const lan = this.state.language;
        return(
            <Modal 
                visible={this.state.viewModal}
                onHandleOk={() => this.onCancel()}
                onHandleCancel={() => this.onCancel()}
                className="big-modal">
                <Steps current={this.state.stepCurrent}>
                {this.state.questions
                    ? this.state.questions.map((item, index) => (
                        <Step/>
                    ))
                    : null
                }
                </Steps>
                <div className="steps-content">
                {this.state.questions
                    ? this.state.questions.map((item, index) => (
                        this.state.stepCurrent === index
                            ? <div className="steps-content-structure">
                                <div className="steps-content-structure-responses"> 
                                    <h3>{item.title}</h3>
                                    
                                    {this.answers(item.response_true, item.response_false_1, item.response_false_2, item.id_question).map((item, index) => 
                                        <p 
                                            className={this.state.responseSelected === item.id ? 'selected' : null} 
                                            onClick={() => this.handleResponse(item.question, (item.id === 0) ? true : false, item.id)}>
                                            {item.answer}
                                        </p>
                                    )}
                                    
                                </div>
                            </div>
                            : null
                    ))
                    : null
                }
                </div>
            </Modal>
        )
    }
}

export default TestQuestionsModal