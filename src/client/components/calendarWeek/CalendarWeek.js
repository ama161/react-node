import WeekCalendar from 'react-week-calendar';
import moment from 'moment';
import React from 'react';

import language from '../../language/language';
import CellModal from './CellModal';

class CalendarWeek extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0,
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    componentWillReceiveProps(nextProps){
        this.setState({language: sessionStorage.language})
    }

    render(){
        const lan = this.state.language;

        return(
            <WeekCalendar
                startTime = {moment({h: 9, m: 0})}
                endTime = {moment({h: 17, m: 0})}
                numberOfDays= {5}
                scaleUnit ={60}
                dayFormat={'dddd'}
                onEventClick={() => console.log("onEventClick")}
                modalComponent={CellModal}
            />
        )
    }
}

export default CalendarWeek