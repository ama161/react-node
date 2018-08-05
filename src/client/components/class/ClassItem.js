import React from 'react';

import Box from '../utils/Box';

class ClassItem extends React.Component{
    constructor(props){
        super(props);

        this.state={
            
        }
    }

    render(){
        return(
            <Box type="brown" typeIcon={this.props.icon}>
                <p>{this.props.name}</p>
            </Box>
        )
    }
}

export default ClassItem