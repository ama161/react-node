import React from 'react';
import {message} from 'antd'
import Modal from '../utils/Modal';
import language from '../../language/language'
import SelectClass from '../utils/select/SelectClass';
import {get, postTestInClass} from '../../services/test';

class TestStudentModal extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0,
            class: '',
            test: '',
            arrayClass: []
        }
    }

    componentWillMount(){
        get(this.props.testId)
        .then(result => {
            this.setState({
                test: result.test, viewModal: this.props.visible, language: sessionStorage.language, arrayClass: result.class
            })
        })
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onChangeClass(event){
        this.setState({class: event})
    }

    onOk(){
        postTestInClass(this.props.testId, this.state.class)
        .then(result => {
            if(result.hasOwnProperty('msg'))
                message[result.type](result.msg)
            if(result.type === 'success') this.onCancel();
        })
        .catch(err => console.log(err))
    }

    render(){
        const lan = this.state.language
        return(
            <Modal 
                visible={this.state.viewModal}
                onHandleOk={() => this.onOk()}
                onHandleCancel={() => this.onCancel()}>
                {this.state.test
                    ? <div className="testView-modalClass-header">
                        <h3>{this.state.test[0].title}</h3>
                        <p>{this.state.test[0].description}</p>
                    </div>
                    : null
                }
                
                <h4>{language[lan].class}</h4>
                <div className="testView-modalClass-classes">
                    {this.state.arrayClass.map(item => 
                        <p>{item.name}</p>
                    )}
                </div>
                <div className="form-item">
                    <label>{language[lan].class}</label>
                    <SelectClass onHandleChange={(value) => this.onChangeClass(value)}/>
                </div>
            </Modal>
        )
    }
}

export default TestStudentModal;