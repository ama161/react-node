import React from 'react';

import Box from '../utils/Box';

class TestItem extends React.Component{
    constructor(props){
        super(props);

        this.state={
            
        }
    }

    render(){
        return(
            <div onClick={() => {this.props.onHandleTest(this.props.testId)}}>
                <Box type="brown">
                    <p>{this.props.title}</p>
                    <p>{this.props.description}</p>
                </Box>
            </div>
        )
    }
}

export default TestItem