import React from 'react';
import Select from './Select'
import {getStudentsByClass} from '../../../services/user'

class SelectStudentByClass extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            student: {}
        }
    }

    componentWillMount(){
        getStudentsByClass(this.props.classId)
        .then(result => this.setState({student: result}));
    }

    componentWillReceiveProps(nextProps){
        getStudentsByClass(nextProps.classId)
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

export default SelectStudentByClass;