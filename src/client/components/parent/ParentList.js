import React from 'react';

import {getAll} from '../../services/user';
import language from '../../language/language'
import Table from '../utils/Table';
  
class ParentList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            parents: [],
            language: 0,
        }
    }

    componentWillMount(){
        getAll('parent')
        .then(result => {
            this.setState({parents: result, language: sessionStorage.language})
        })
    }

    componentWillReceiveProps(){
        getAll('parent')
        .then(result => this.setState({parents: result, language: sessionStorage.language}))
    }

    render(){
        const columns = [{
            title: language[this.state.language].name,
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: language[this.state.language].email,
            dataIndex: 'email',
            key: 'email'
          },
          {
            title: language[this.state.language].phone,
            dataIndex: 'phone',
            key: 'phone'
          },
          {
            title: language[this.state.language].student,
            dataIndex: 'name_student',
            key: 'name_student'
          }];
        return(
            <div>
                <Table columns={columns} data={this.state.parents}/>                
            </div>
        )
    }
}

export default ParentList