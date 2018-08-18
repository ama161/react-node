import React from 'react';
import Calendar from '../utils/Calendar';
import { getByParent } from '../../services/calendar';
import SuccessAssistanceModal from './SuccessAssistanceModal';

class CalendarParent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            assistanceModal: false,
            date: '',
            dataCalendar: []
        }
    }

    componentWillMount(){
        this.getByParents()
    }

    componentWillReceiveProps(){
        this.getByParents()
    }

    getByParents(){
        getByParent(sessionStorage.idUser)
        .then(result => {
            this.setState({dataCalendar: result})
        })
        .catch(err => console.log(err))
    }

    onHandleDate(date){
        for(let i=0; i<this.state.dataCalendar.length; i++){
            if(this.state.dataCalendar[i].date === date && this.state.dataCalendar[i].type === 'error'){
                this.setState({assistanceModal: true, infoDate: this.state.dataCalendar[i]})
            }
        }
    }

    render(){
        return(
            <div>
                {this.state.assistanceModal
                    ? <SuccessAssistanceModal 
                        visible={this.state.assistanceModal}
                        onHandleCancel={() => {
                            this.getByParents();
                            this.setState({assistanceModal: false, date: ''})}
                        }
                        infoDate={this.state.infoDate}/>
                    : null
                }
                <Calendar 
                    onHandleDate={(date) => this.onHandleDate(date)}
                    dataCalendar={this.state.dataCalendar}/>
            </div>
        )
    }
}

export default CalendarParent