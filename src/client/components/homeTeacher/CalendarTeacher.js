import React from 'react';
import Calendar from '../utils/Calendar';
import AssistanceModal from './AssistanceModal';
import { getByTeacher } from '../../services/calendar';

class CalendarTeacher extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            assistanceModal: false,
            date: '',
        }
    }

    componentWillMount(){
        getByTeacher(sessionStorage.idUser)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    onHandleDate(date){
        this.setState({assistanceModal: true, date: date})
    }

    render(){
        return(
            <div>
                {this.state.assistanceModal
                    ?  <AssistanceModal 
                        visible={this.state.assistanceModal} 
                        onHandleCancel={() => this.setState({assistanceModal: false, date: ''})}
                        date={this.state.date}/>
                    : null
                }
                <Calendar onHandleDate={(date) => this.onHandleDate(date)}/>
            </div>
        )
    }
}

export default CalendarTeacher