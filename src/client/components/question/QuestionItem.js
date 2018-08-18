import React from 'react'
import {Checkbox} from 'antd'
import {get} from '../../services/question'
import language from '../../language/language'

class QuestionItem extends React.Component{
    constructor(props){
        super(props);

        this.state={
            question: {},
            language: 0,
            disabled: false,
            checked: false
        }
    }

    componentWillMount(){
        if(this.props.id_question){
            get(this.props.id_question)
            .then(result => this.setState({
                question: result[0], 
                language: sessionStorage.language,
                disabled: (this.props.disabled) ? this.props.disabled : false,
                checked: (this.props.checked) ? this.props.checked : false
            }))
        }   
    }

    onChangeCheckbox(event){
        // console.log(event.target.checked)
        // this.setState({checked: })
    }

    render(){
        const lan = this.state.language;
        return(
            <div className="item">
                <h2>{this.state.question.title}</h2>
                <Checkbox checked={this.state.checked} disabled={this.state.disabled} onChange={this.onChangeCheckbox}>{this.state.question.response_true}</Checkbox>
                <Checkbox disabled={this.state.disabled} onChange={this.onChangeCheckbox}>{this.state.question.response_false_1}</Checkbox>
                <Checkbox disabled={this.state.disabled} onChange={this.onChangeCheckbox}>{this.state.question.response_false_2}</Checkbox>
                <p>{this.state.question.name}</p>
            </div>
        )
    }
}

export default QuestionItem