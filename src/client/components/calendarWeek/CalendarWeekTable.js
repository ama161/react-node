import React from 'react';
import { get as getDays } from '../../services/day';
import { get as getTimes } from '../../services/time';
import { Table as TableANT} from 'antd'
import { post , getByClass} from '../../services/calendarWeek';
import Input from '../utils/Input';
import SelectSubject from '../utils/select/SelectSubject';

class CalendarWeekTable extends React.Component{
    constructor(props){
        super(props);

        this.addInfo = this.addInfo.bind(this);

        this.state={
            columns: [],
            times: [],
            data: []
        }
    }

    addInfo(day, element, subject){
        console.log(day);
        console.log(element);
        console.log(subject);
    }

    data(c){
        let columns = [];
        let data = [];
        getDays()
        .then(result => {
            columns.push({id_day: 0, title: "TIME", dataIndex: "time", key: 'time', fixed: "left"})
            result.forEach(element => {
                columns.push({
                    id_day: element.id_day, 
                    title: element.title, 
                    dataIndex: element.title.toLowerCase(), 
                    key: element.title.toLowerCase(),
                    render: (text, record) => {
                        // return <button onClick={() => this.addInfo(element.title, record)}>{element.title}</button>
                        // return <Input 
                        //     className="form-item"
                        //     value={text}
                        //     type="text" 
                        //     onChange={(event) => 
                        //         this.addInfo(element.title, record, event.target.value)
                        //     }
                        // />
                        return <SelectSubject onHandleChange={(value) => this.addInfo(element.title, record, value)}/>
                        }
                    });
            });

            getByClass(c).then(result => {
                if(result.length == 0){
                    post(c).then(result => {
                        getByClass(c).then(result => {
                            result.forEach(element => {
                                data.push({
                                    id_class: element.id_class, 
                                    friday: (element.friday !== "") ? element.friday : <button onClick={() => this.addInfo('friday', element)}>ADD</button>,
                                    monday: (element.monday !== "") ? element.monday : <button onClick={() => this.addInfo('monday', element)}>ADD</button>,
                                    thursday: (element.thursday !== "") ? element.thursday : <button onClick={() => this.addInfo('thursday', element)}>ADD</button>,
                                    time: element.time,
                                    tuesday: (element.tuesday !== "") ? element.tuesday : <button onClick={() => this.addInfo('tuesday', element)}>ADD</button>,
                                    wednesday: (element.wednesday !== "") ? element.wednesday : <button onClick={() => this.addInfo('wednesday', element)}>ADD</button>,
                                });
                            });
                            this.setState({columns: columns, data: data})
                        })
                    })
                }
                else{
                    result.forEach(element => {
                        console.log(element.friday !== "")
                        data.push({
                            id_class: element.id_class, 
                            friday: (element.friday !== "") ? element.friday : <button onClick={() => this.addInfo('friday', element)}>ADD</button>,
                            monday: (element.monday !== "") ? element.monday : <button onClick={() => this.addInfo('monday', element)}>ADD</button>,
                            thursday: (element.thursday !== "") ? element.thursday : <button onClick={() => this.addInfo('thursday', element)}>ADD</button>,
                            time: element.time,
                            tuesday: (element.tuesday !== "") ? element.tuesday : <button onClick={() => this.addInfo('tuesday', element)}>ADD</button>,
                            wednesday: (element.wednesday !== "") ? element.wednesday : <button onClick={() => this.addInfo('wednesday', element)}>ADD</button>,
                        });
                    });
                    this.setState({columns: columns, data: data})
                }
            })
        })
    }

    componentWillMount(){
        this.data(this.props.class);
    }

    componentWillReceiveProps(nextProps){
        this.data(nextProps.class)
    }

    render(){
        console.log(this.state)
        if(this.state.columns){
            return(
                <TableANT columns={this.state.columns} dataSource={this.state.data}/>
            )
        }
    }
}

export default CalendarWeekTable