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
            responseSelected: ''
        }
    }

    componentWillMount(){
        get(this.props.testId)
        .then(result => {
            this.setState({viewModal: this.props.visible, language: sessionStorage.language, questions: result.questions})
        })
    }

    componentWillReceiveProps(nextProps){
        get(nextProps.testID)
        .then(result => this.setState({viewModal: nextProps.visible, language: sessionStorage.language, questions: result.questions}))        
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    handleResponse(idQuestion, type, response){
        let array = this.state.trueQuestions;
        console.log(type);
        if(this.state.trueQuestions.length){
            for(let i = 0; i < this.state.trueQuestions.length; i++){
                if(this.state.trueQuestions[i].id_question === idQuestion){
                    array.splice(i, 1);
                }
                array.push({id_question: idQuestion, correct: type})
                this.setState({trueQuestions: array, responseSelected: response}, console.log(this.state))            
            }
        }
        else {
            array.push({id_question: idQuestion, correct: type})
            this.setState({trueQuestions: array, responseSelected: response}, console.log(this.state)) 
        }
    }

    render(){
        const lan = this.state.language;
        return(
            <Modal 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}
                footer={[
                    <button key="back" class="ant-btn" onClick={this.onCancel}>{language[lan].cancel} </button>,
                    <button key="submit" class="ant-btn ant-btn-primary" onClick={this.onCancel}>
                        {language[lan].addTest} 
                    </button>
                ]}>
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
                                <button 
                                    class="ant-btn"
                                    // onClick={() => {
                                    //     this.setState({stepCurrent: (this.state.stepCurrent - 1 >= 0) ? this.state.stepCurrent-1 : this.state.stepCurrent})
                                    // }}
                                    >
                                    <Icon type="left" />
                                </button>    
                                <div className="steps-content-structure-responses"> 
                                    <h3>{item.title}</h3>                           
                                    <p 
                                        className={this.state.responseSelected === 0 ? 'selected' : null} 
                                        onClick={() => this.handleResponse(item.id_question, true, 0)}
                                        >
                                        {item.response_true}
                                    </p>
                                    <p 
                                        className={this.state.responseSelected === 1 ? 'selected' : null} 
                                        onClick={() => this.handleResponse(item.id_question, false, 1)}>
                                        {item.response_false_1}
                                    </p>
                                    <p 
                                        className={this.state.responseSelected === 2 ? 'selected' : null} 
                                        onClick={() => this.handleResponse(item.id_question, false, 2)}>
                                        {item.response_false_2}
                                    </p>
                                </div>
                                <button 
                                    class="ant-btn" 
                                    onClick={() => 
                                        this.setState({
                                            stepCurrent: (this.state.stepCurrent + 1 < this.state.questions.length) ? this.state.stepCurrent+1 : this.state.stepCurrent,
                                            responseSelected: ''
                                        })
                                    }>
                                    <Icon type="right" />
                                </button>
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