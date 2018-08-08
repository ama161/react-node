import React from 'react';
import Select from './Select'
import {getAll} from '../../../services/question'

class SelectQuestion extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            question: {}
        }
    }

    componentWillMount(){
        getAll()
        .then(result => this.setState({question: result}));
    }

    componentWillReceiveProps(){
        getAll()
        .then(result => this.setState({question: result}));
    }

    render(){
        return(
            <Select 
                placeholder="Select question" 
                options={this.state.question} onHandleChange={this.props.onHandleChange}
                id="id_question"
                name="title"/>
        )
    }
}

export default SelectQuestion;