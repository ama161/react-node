import React from 'react';
// import { message } from 'antd';

import Modal from '../utils/Modal'
import Input from '../utils/Input';
import language from '../../language/language'
import CalendarWeekTable from './CalendarWeekTable';
import SelectClass from '../utils/select/SelectClass';
import { put } from '../../services/calendarWeek';

class CalendarWeekModal extends React.Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onHandleOk = this.onHandleOk.bind(this);

        this.state={
            viewModal: false,
            language: 0,
            class: '',
            newData: []
        }
    }

    componentWillMount(){
        this.setState({viewModal: this.props.visible, language: sessionStorage.language, class: this.props.classId})
    }

    componentWillReceiveProps(nextProps){
        this.setState({viewModal: nextProps.visible, language: sessionStorage.language, class: nextProps.classId})
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    onHandleOk(){
        put(this.state.newData)
        .then(result => console.log(result))
        .catch(err => console.log(err))
        this.onCancel();
    }

    onChangeClass(event){
        this.setState({class: event})
        
    }

    onSubmit(newData){
        this.setState({newData: newData})
    }

    render(){
        const lan = this.state.language;

        return(
            <Modal 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}
                footer={[
                    <button key="back" class="ant-btn" onClick={this.onCancel}>{language[lan].cancel} </button>,
                    <button key="submit" class="ant-btn ant-btn-primary" onClick={this.onHandleOk}>
                        {language[lan].addCalendarWeek} 
                    </button>
                ]}>
                {/* <div className="form-item">
                    <label>{language[lan].class}</label>
                    <SelectClass onHandleChange={(value) => this.onChangeClass(value)}/>
                </div> */}
                <div className="calendarWeekModal-container">
                    {this.state.class ? <CalendarWeekTable class={this.state.class} onSubmit={(newData) => this.onSubmit(newData)}/> : null}
                </div>
            </Modal>
        )
    }
}

export default CalendarWeekModal