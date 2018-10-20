import React from 'react';
import {Icon} from 'antd';
import {withRouter} from 'react-router-dom';

import language from '../../language/language'
import CalendarWeekModal from '../calendarWeek/CalendarWeekModal';
import Box from '../utils/Box';

class ClassItem extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0,
            viewCalendarWeek: false,
        }
    }

    render(){
        const lan = (this.state.language) ? this.state.language : 0;

        const classDiv = `boxClass box box-brown ${(this.props.classSelected === this.props.id) ? "selectedClass" : null}`;
        return(
            <div className={classDiv} >
                <div onClick={() => this.props.onHandleClick(this.props.id)}>
                    <Box type="none" typeIcon={this.props.icon} selected={""}>
                        <p>{this.props.name}</p>
                    </Box>
                    
                </div>
                <button class="ant-btn" onClick={() => this.setState({viewCalendarWeek: true})} title={language[lan].calendarWeek}><Icon type="calendar" theme="outlined" /></button>
                { this.state.viewCalendarWeek
                    ? <CalendarWeekModal 
                        visible={this.state.viewCalendarWeek} 
                        onHandleCancel={() => this.setState({viewCalendarWeek: false})}
                        classId={this.props.id}/>
                    : null
                }
            </div>
            
        )
    }
}

export default withRouter(ClassItem)