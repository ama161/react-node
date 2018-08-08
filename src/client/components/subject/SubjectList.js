import React from 'react';
import Table from '../utils/Table';

import language from '../../language/language'
import {getAll} from '../../services/subject'

class SubjectList extends React.Component{
    constructor(props){
        super(props);

        this.getAllSubjects = this.getAllSubjects.bind(this);
        this.state = {
            subjects: [],
            language: 0
        }
    }

    componentWillMount(){
        this.getAllSubjects();
    }

    componentWillReceiveProps(){
        this.getAllSubjects();
    }

    getAllSubjects(){
        getAll()
        .then(result => {
            this.setState({subjects: result, language: sessionStorage.language})
        })
    }

    render(){
        const columns = [
            {
                title: 'Icon',
                key: 'icon',
                render: (text, record) => (
                    <p className={record.icon}></p>
                )},
            {
                title: language[this.state.language].name,
                dataIndex: 'name',
                key: 'name'
            }];
        return(
            <div>
                <Table columns={columns} data={this.state.subjects}/>                
            </div>
        )
    }
}

export default SubjectList