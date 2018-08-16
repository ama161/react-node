import React from 'react';
import {withRouter} from 'react-router-dom';

import Box from '../utils/Box';

class ClassItem extends React.Component{
    constructor(props){
        super(props);

        this.state={}
    }

    render(){
        return(
            <div onClick={() => this.props.onHandleClick(this.props.id)}>
                <Box type="brown" typeIcon={this.props.icon} selected={(this.props.classSelected === this.props.id) ? 'selectedClass' : null}>
                    <p>{this.props.name}</p>
                </Box>
            </div>
        )
    }
}

export default withRouter(ClassItem)