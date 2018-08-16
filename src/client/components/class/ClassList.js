import React from 'react';

import {getAll} from '../../services/class';
import {getStudentsByClass} from '../../services/user';
import ClassItem from './ClassItem'

class ClassList extends React.Component{
    constructor(props){
        super(props);

        this.onClassClick = this.onClassClick.bind(this);
        this.state={
            class: {},
            classSelected: ''
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

    onClassClick(id){
        getStudentsByClass(id)
        .then((result) => {
            this.setState({classSelected: id})
            this.props.onClassClick(result)
        })
    }

    render(){
        return(
            <div className="classList-container">
                {Object.values(this.state.class).map((key, index) => 
                    <ClassItem 
                        name={key.name} 
                        icon={key.icon} 
                        id={key.id_class} 
                        onHandleClick={(id) => this.onClassClick(id)}
                        classSelected={this.state.classSelected}/>
                )}
            </div>
        )
    }
}

export default ClassList