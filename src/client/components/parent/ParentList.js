import React from 'react';
import {Icon} from 'antd'
import {getAll} from '../../services/user';
import language from '../../language/language'
import Table from '../utils/Table';
import ParentStudentModal from '../parent/ParentStudentModal'

class ParentList extends React.Component{
    constructor(props){
        super(props);

        this.getAllParents = this.getAllParents.bind(this);
        this.state = {
            parents: [],
            language: 0,
            viewParentStudentModal: false
        }
    }

    componentWillMount(){
        this.getAllParents();
    }

    componentWillReceiveProps(){
        this.getAllParents();
    }

    getAllParents(){
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
          },
          {
            title: language[this.state.language].options,
            key: 'options',
            render: (text, record) => (
              <span onClick={() => this.setState({viewParentStudentModal: true, id_parent: record.id_parent})}>
                  {language[this.state.language].addStudents} <Icon type="folder-add" />
              </span>
            )
        }];
        return(
            <div>
                {this.state.viewParentStudentModal
                    ? <ParentStudentModal 
                        visible={this.state.viewParentStudentModal} 
                        onHandleCancel={() => {
                            this.setState({viewParentStudentModal: false})
                            this.getAllParents();
                        }}
                        id_parent={this.state.id_parent}/>
                    : null
                }
                <Table columns={columns} data={this.state.parents}/>                
            </div>
        )
    }
}

export default ParentList