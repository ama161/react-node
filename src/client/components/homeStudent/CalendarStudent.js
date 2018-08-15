import React from 'react';
import Calendar from '../utils/Calendar';
import { getByStudent } from '../../services/calendar';

class CalendarStudent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            assistanceModal: false,
            date: '',
            dataCalendar: []
        }
    }

    componentWillMount(){
        this.getByStudent()
    }

    componentWillReceiveProps(){
        this.getByStudent();
    }

    getByStudent(){
        getByStudent(sessionStorage.idUser)
        .then(result => this.setState({dataCalendar: result}))
        .catch(err => console.log(err))        
    }

    onHandleDate(date){
        this.setState({assistanceModal: true, date: date})
    }

    render(){
        return(
            <div>
                <Calendar 
                    onHandleDate={(date) => {}}
                    dataCalendar={this.state.dataCalendar}/>
            </div>
        )
    }
}

export default CalendarStudent