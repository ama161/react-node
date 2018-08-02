import React from 'react';

import {getAll} from '../../services/class';

class ClassList extends React.Component{
    constructor(props){
        super(props);

        this.state={}
    }

    componentWillMount(){
        getAll()
        .then(result => console.log(result))
    }

    render(){
        return(
            <div>
                CLASS LIST
            </div>
        )
    }
}

export default ClassList