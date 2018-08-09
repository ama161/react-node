import React from 'react';
import {getByRole} from '../../services/user'

class DossierStudent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            subjects: {},
            data: {},
            subjectId: '',
        }
    }

    componentWillMount(){
        this.setState({data: this.props.student.data, subjects: this.props.student.subjects})
    }

    render(){
        return(
            <div className="dossierStudent-container">
            {this.state.subjects
                ? this.state.subjects.map((key, index) => (
                    <div className="dossierStudent-container-item" onClick={() => this.setState({subjectId: key.id_subject})}>
                        <h2>{key.name}</h2>
                        {this.state.subjectId === key.id_subject
                            ? this.state.data.map((key, index) => (
                                key[this.state.subjectId]
                                    ? key[this.state.subjectId].map((key, index) => 
                                        <p>{key.title} - {key.note}</p>
                                    )
                                    : null  
                                ))
                            : null
                        }
                    </div>
                  ))
                : null
            }
            
            </div>
        )
    }
}

export default DossierStudent