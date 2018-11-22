import React from 'react';
import Select from './Select'
import {getAll} from '../../../services/subject'
import { getTeachersStudent } from '../../../services/user';

class SelectTeacherByClass extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            teachers: {}
        }
    }

    componentWillMount(){
        if(this.props.classId){
            getTeachersStudent(this.props.classId)
            .then(result => {
                this.setState({teachers: result})
            })
            .catch(err => console.log(err))
        }
    }

    componentWillReceiveProps(){
        if(this.props.classId){
            getTeachersStudent(this.props.classId)
            .then(result => {
                this.setState({teachers: result})
            })
            .catch(err => console.log(err))
        }
    }

    render(){
        return(
            <Select 
                placeholder="Teacher" 
                options={this.state.teachers} 
                onHandleChange={this.props.onHandleChange}
                id="id_teacher"
                name="name"/>
        )
    }
}

export default SelectTeacherByClass;