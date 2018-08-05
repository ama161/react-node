import React from 'react';
import Select from './Select'
import {getAll} from '../../../services/user'

class SelectClass extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            class: {}
        }
    }

    componentWillMount(){
        getAll('student')
        .then(result => this.setState({student: result}));
    }

    componentWillReceiveProps(){
        getAll('student')
        .then(result => this.setState({student: result}));
    }

    render(){
        return(
            <Select 
                placeholder="Select student" 
                options={this.state.student} onHandleChange={this.props.onHandleChange}
                id="id_student"
                name="username"/>
        )
    }
}

export default SelectClass;