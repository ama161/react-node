import React from 'react';
import {Icon} from 'antd';

import {getAll} from '../../services/user';
import Table from '../utils/Table';
import SelectClass from '../utils/select/SelectClass'
import ClassTeacherModal from '../class/ClassTeacherModal';
import language from '../../language/language'
  
class TeacherList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            teachers: [],
            classTeacherModal: false,
            language: 0,
        }
    }

    componentWillMount(){
        getAll('teacher')
        .then(result => {
            this.setState({teachers: result, language: sessionStorage.language})
        })
    }

    componentWillReceiveProps(){
        getAll('teacher')
        .then(result => this.setState({teachers: result, language: sessionStorage.language}))
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
            title: language[this.state.language].class,
            dataIndex: 'class_name',
            key: 'class_name'
          },
          {
            title: language[this.state.language].options,
            key: 'options',
            render: (text, record) => (
              <span onClick={() => this.setState({classTeacherModal: true, id_teacher: record.id_teacher})}>
                  {language[this.state.language].addClass} <Icon type="folder-add" />
              </span>
            ),
          }];
        return(
            <div>
                {this.state.classTeacherModal
                    ? <ClassTeacherModal 
                        visible={this.state.classTeacherModal} 
                        onHandleCancel={() => this.setState({classTeacherModal: false})}
                        id_teacher={this.state.id_teacher}/>
                    : null
                }
                <Table columns={columns} data={this.state.teachers}/>                
            </div>
        )
    }
}

export default TeacherList