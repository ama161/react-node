import React from 'react';

import Box from './Box';

class UserItem extends React.Component{
    constructor(props){
        super(props);

        this.state={
            
        }
    }

    render(){
        return(
            <div onClick={() => {this.props.onStudentClick(this.props.id)}}>
                <Box type="white" typeIcon={this.props.icon}>
                    <p>{this.props.name}</p>
                </Box>
            </div>
        )
    }
}

export default UserItem