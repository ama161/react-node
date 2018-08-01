import React from 'react';
import { Modal as AntModal } from 'antd';

class Modal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            visible: false,
        }
    }

    render(){
        return(
            <div>
                <button onClick={() => this.setState({visible: true})}>{this.props.title}</button>
                <AntModal 
                    onOk={this.handleOk}
                    okText={this.props.title}
                    visible={this.state.visible}
                    onCancel={() => this.setState({visible: false})}
                >
                    {this.props.children}
                </AntModal>
            </div>
        )
    }
}

export default Modal