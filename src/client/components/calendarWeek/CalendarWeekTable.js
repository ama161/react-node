import React from 'react';
import { get as getDays } from '../../services/day';
import { get as getTimes } from '../../services/time';
import { Table as TableANT} from 'antd'
import { post , getByClass} from '../../services/calendarWeek';
import Input from '../utils/Input';
import SelectSubject from '../utils/select/SelectSubject';
import { getAll } from '../../services/subject';
import { SSL_OP_CRYPTOPRO_TLSEXT_BUG } from 'constants';
import { userByRole } from '../../functions/userByRole';

class CalendarWeekTable extends React.Component{
    constructor(props){
        super(props);

        this.addInfo = this.addInfo.bind(this);

        this.state={
            columns: [],
            times: [],
            data: [],
            newData:[],
            isAdmin: false,
        }
    }

    addInfo(day, time, subject){
        let aux = [];
        aux = this.state.newData;
        aux.forEach(e => {
            if(e.time == time){
                e[day] = subject;
            }
        });

        this.setState({newData: aux}, () => this.props.onSubmit(aux));
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

                        if(text == '' && this.state.isAdmin == true){
                            return <SelectSubject 
                                    onHandleChange={(value) => this.addInfo(element.title, record.time, value)}
                                />
                        }
                        else{
                            return Object.values(this.state.subjects).map(element => 
                                element.id_subject == text ? element.name : ''
                            );
                        }
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
                                    friday: element.friday,
                                    monday: element.monday,
                                    thursday: element.thursday,
                                    time: element.time,
                                    tuesday: element.tuesday,
                                    wednesday: element.wednesday
                                });
                            });
                            this.setState({columns: columns, data: data, newData: data})
                        })
                    })
                }
                else{
                    result.forEach(element => {
                        data.push({
                            id_class: element.id_class, 
                            friday: element.friday,
                            monday: element.monday,
                            thursday: element.thursday,
                            time: element.time,
                            tuesday: element.tuesday,
                            wednesday: element.wednesday,
                        });
                    });
                    this.setState({columns: columns, data: data, newData: data})
                }
            })
        })
    }

    componentWillMount(){
        userByRole()
            .then((result) => {
                let isAdmin = false;
                if(result === 'admin') isAdmin = true;

                getAll()
                    .then(result => {
                        this.setState({subjects: result, isAdmin: isAdmin})
                    });
                    this.data(this.props.class);
            })
    }

    componentWillReceiveProps(nextProps){
        //this.data(nextProps.class)
    }

    render(){
        if(this.state.columns){
            return(
                <TableANT columns={this.state.columns} dataSource={this.state.data}/>
            )
        }
    }
}

export default CalendarWeekTable