import React from 'react';
import { Modal as AntModal } from 'antd';

class Modal extends React.Component{
    constructor(props){
        super(props);

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
 
        this.state = {
            visible: false,
            title: ''
        }
    }

    handleOk(){
        this.props.onHandleOk()
    }

    componentWillMount(){
        this.setState({visible: this.props.visible, title: this.props.title})
    }

    componentWillReceiveProps(nextProps){
        this.setState({visible: nextProps.visible, title: nextProps.title})
    }

    handleCancel(){
        this.setState({visible: false})
        this.props.onHandleCancel()
    }

    render(){
        console.log(this.props.width)
        return(
            <div>
                <AntModal 
                    onOk={this.handleOk}
                    okText={this.state.title}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={this.props.footer}
                    className={this.props.className}
                >
                    {this.props.children}
                </AntModal>
            </div>
        )
    }
}

export default Modal