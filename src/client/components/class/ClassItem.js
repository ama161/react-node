import React from 'react';
import {withRouter} from 'react-router-dom';

import Box from '../utils/Box';

class ClassItem extends React.Component{
    constructor(props){
        super(props);

        this.onHandleClick = this.onHandleClick.bind(this);

        this.state={
            
        }
    }

    onHandleClick(id){
        if(this.props.location.pathname === '/homeTeacher')
            this.props.onHandleClick(id);
    }

    render(){
        return(
            <div onClick={() => this.onHandleClick(this.props.id)}>
                <Box type="brown" typeIcon={this.props.icon}>
                    <p>{this.props.name}</p>
                </Box>
            </div>
        )
    }
}

export default withRouter(ClassItem)