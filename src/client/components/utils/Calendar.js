import React from 'react';
import { Calendar as CalendarANT, Badge} from 'antd';
import moment from 'moment';

class Calendar extends React.Component{
    constructor(props){
        super(props);

        this.onSelect = this.onSelect.bind(this);
        this.dateCellRender = this.dateCellRender.bind(this);
        this.state={
            date: '',
            dataCalendar: []
        }
    }

    componentWillMount(){
        this.setState({dataCalendar: this.props.dataCalendar})
    }

    componentWillReceiveProps(nextProps){
        this.setState({dataCalendar: nextProps.dataCalendar})        
    }

    onSelect(date){
        this.props.onHandleDate(date.format('DD-MM-YYYY'));
    }

    getListData(data, date){
        let array = [];
        for(let i = 0; i<data.length; i++){
            if(data[i].date === date){
                array.push(data[i])
            }
        }

        return array;
    }

    dateCellRender(event){
        let date = event.format('DD-MM-YYYY')
        if(this.state.dataCalendar){
            let array = [];
            for(let i = 0; i<this.state.dataCalendar.length; i++){
                if(this.state.dataCalendar[i].date === date){
                    array.push(this.state.dataCalendar[i])
                }
            }

            return (
                <div>
                    {array.map((item, index) => 
                        <li>
                            <Badge 
                                status={item.type} 
                                text={(item.username !== null) 
                                    ? item.username + ' ' + item.description
                                    : item.name + ' ' + item.description
                                } />
                        </li>
                    )}
                </div>
            );
        }
    }

    render(){
        return(
            <div className="calendar">
                <CalendarANT 
                    dateCellRender={this.dateCellRender}
                    onSelect={date => this.onSelect(date)}/>
            </div>
        )
    }
}

export default Calendar;