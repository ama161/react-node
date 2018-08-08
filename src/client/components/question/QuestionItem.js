import React from 'react'
import {Checkbox} from 'antd'
import {get} from '../../services/question'
import language from '../../language/language'

class QuestionItem extends React.Component{
    constructor(props){
        super(props);

        this.state={
            question: {},
            language: 0
        }
    }

    componentWillMount(){
        if(this.props.id_question){
            get(this.props.id_question)
            .then(result => this.setState({question: result[0], language: sessionStorage.language}))
        }   
    }

    onChangeCheckbox(event){
        console.log(event.target.checked)
    }

    render(){
        const lan = this.state.language;
        return(
            <div className="item">
                <h2>{this.state.question.title}</h2>
                <Checkbox onChange={this.onChangeCheckbox}>{this.state.question.response_true}</Checkbox>
                <Checkbox onChange={this.onChangeCheckbox}>{this.state.question.response_false_1}</Checkbox>
                <Checkbox onChange={this.onChangeCheckbox}>{this.state.question.response_false_2}</Checkbox>
                <p>{this.state.question.name}</p>
            </div>
        )
    }
}

export default QuestionItem