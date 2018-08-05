import React from 'react';

import {getAll} from '../../services/class';
import ClassItem from './ClassItem'

class ClassList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            class: {}
        }
    }

    componentWillMount(){
        getAll()
        .then(result => {
            this.setState({class: result})
        })
    }

    componentWillReceiveProps(nextProps){
        getAll()
        .then(result => {
            this.setState({class: result})
        })
    }

    render(){
        return(
            <div className="classList-container">
                {Object.values(this.state.class).map((key, index) => 
                    <ClassItem name={key.name} icon={key.icon}/>
                )}
            </div>
        )
    }
}

export default ClassList