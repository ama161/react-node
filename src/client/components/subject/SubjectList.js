import React from 'react';
import Table from '../utils/Table';
import {Icon} from 'antd';
import language from '../../language/language'
import {getAll} from '../../services/subject'
import SubjectModal from '../subject/SubjectModal'

class SubjectList extends React.Component{
    constructor(props){
        super(props);

        this.getAllSubjects = this.getAllSubjects.bind(this);
        this.state = {
            subjects: [],
            language: 0,
            subjectModal: false,
            id_subject: ''
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
                )
            },
            {
                title: language[this.state.language].name,
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: language[this.state.language].options,
                key: 'options',
                render: (text, record) => (
                <span>
                    <Icon type="edit" onClick={() => this.setState({subjectModal: true, id_subject: record.id_subject})}/>
                </span>
                ),
            }];
        return(
            <div>
                {this.state.subjectModal
                    ? <SubjectModal 
                        onHandleCancel={() => {
                            this.setState({subjectModal: false, id_subject: ''})
                            this.getAllSubjects();
                        }} 
                        id_subject={this.state.id_subject}
                        visible={this.state.subjectModal}/>
                    : null
                }
                <Table columns={columns} data={this.state.subjects}/>                
            </div>
        )
    }
}

export default SubjectList