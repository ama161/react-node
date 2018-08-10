import React from 'react';

import {getAllStudents} from '../../services/user';
import UserItem from '../utils/UserItem';

class StudentList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            students: {}
        }
    }

    componentWillMount(){
        getAllStudents()
        .then(result => {
            this.setState({students: result})
        })
    }

    componentWillReceiveProps(nextProps){
        getAllStudents()
        .then(result => {
            this.setState({students: result})
        })
    }

    render(){
        return(
            <div className="usersList-container">
                {Object.values(this.state.students).map((key, index) => 
                    <UserItem 
                    name={key.username} icon={key.icon} 
                    onStudentClick={(id) => this.props.onStudentClick(id)}
                    id={key.id_student}/>
                )}
            </div>
        )
    }
}

export default StudentList