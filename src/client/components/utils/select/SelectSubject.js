import React from 'react';
import Select from './Select'
import {getAll} from '../../../services/subject'

class SelectSubject extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            subjects: {}
        }
    }

    componentWillMount(){
        getAll()
        .then(result => this.setState({subjects: result}));
    }

    componentWillReceiveProps(){
        getAll()
        .then(result => this.setState({subjects: result}));
    }

    render(){
        return(
            <Select 
                placeholder="Subject" 
                options={this.state.subjects} 
                onHandleChange={this.props.onHandleChange}
                id="id_subject"
                name="name"/>
        )
    }
}

export default SelectSubject;