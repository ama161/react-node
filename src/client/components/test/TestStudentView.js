import React from 'react';

class TestStudentView extends React.Component{
    constructor(props){
        super(props);

        this.state={}
    }

    componentWillMount(){
        console.log(match.params.id);
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}

export default TestStudentView;