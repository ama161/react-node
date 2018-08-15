import React from 'react';
import { Calendar as CalendarANT} from 'antd';
import moment from 'moment';

class Calendar extends React.Component{
    constructor(props){
        super(props);

        this.onSelect = this.onSelect.bind(this);

        this.state={
            date: '',
        }
    }

    onSelect(date){
        this.props.onHandleDate(date.format('DD-MM-YYYY'));
    }

    render(){
        return(
            <div className="calendar">
                <CalendarANT 
                    // fullscreen={false}
                    onSelect={date => this.onSelect(date)}/>
            </div>
        )
    }
}

export default Calendar;