import React from 'react';
import Select from './Select'
import {getAll} from '../../../services/class'

class SelectClass extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            class: {}
        }
    }

    componentWillMount(){
        getAll()
        .then(result => this.setState({class: result}));
    }

    componentWillReceiveProps(){
        getAll()
        .then(result => this.setState({class: result}));
    }

    render(){
        return(
            <Select 
                placeholder="Select class" 
                options={this.state.class} onHandleChange={this.props.onHandleChange}
                id="id_class"
                name="name"/>
        )
    }
}

export default SelectClass;