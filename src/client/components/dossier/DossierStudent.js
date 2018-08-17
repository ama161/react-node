import React from 'react';
import {withRouter} from 'react-router';
import {Icon} from 'antd';
import Modal from '../utils/Modal'
import {getByRole} from '../../services/user'
import language from '../../language/language'
import { getNoteSubject } from '../../services/dossier';

class DossierStudent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            subjects: {},
            data: {},
            subjectId: '',
            viewModal: '',
            language: 0,
            student: {},
            test: {},
            media: []
        }
    }

    componentWillMount(){
        this.setState({
            data: this.props.student.hasOwnProperty('data') ? this.props.student.data : {}, 
            subjects: this.props.student.hasOwnProperty('subjects') ? this.props.student.subjects : [], 
            viewModal: this.props.visible,
            student: this.props.student.hasOwnProperty('student') ? this.props.student.student[0] : {},
            test: this.props.student.hasOwnProperty('test') ? this.props.student.test : [],
            media: this.props.student.hasOwnProperty('media') ? this.props.student.media : [],
            language: sessionStorage.language
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.student.data, 
            subjects: nextProps.student.subjects, 
            viewModal: nextProps.visible,
            student: nextProps.student.student[0],
            test: nextProps.student.test,
            media: nextProps.student.media,
            language: sessionStorage.language
        })
    }

    onCancel(){
        this.setState({viewModal: false});
        this.props.onHandleCancel();
    }

    render(){
        const lan = this.state.language;
        return(
            <Modal 
                visible={this.state.viewModal}
                onHandleCancel={() => this.onCancel()}
                onHandleOk={() => this.onCancel()}>
                {this.state.student
                    ? <div className="dossier-header">
                        <p id="student_icon" className={(this.state.student) ? "icon " + this.state.student.icon : null}></p>
                        <h2>
                            {this.state.student.username}
                            {this.props.history.location.pathname === '/homeParent/' || this.props.history.location.pathname === '/homeParent'
                                ? <p>{this.state.student.name}</p>
                                : null
                            }
                        </h2>
                    </div>
                    : null
                }
                
                {this.props.history.location.pathname !== '/homeStudent/' || this.props.history.location.pathname !== '/homeStudent'
                    ? <div>
                        <button 
                            class="ant-btn ant-btn-primary newDossier-button" 
                            onClick={this.props.newNotification}>
                            {language[lan].notification} {(this.props.history.location.pathname === '/homeTeacher/' || this.props.history.location.pathname === '/homeTeacher') ? language[lan].parent : language[lan].teacher}
                        </button>
                        {this.props.history.location.pathname === '/homeTeacher/' || this.props.history.location.pathname === '/homeTeacher'
                            ? <button 
                                class="ant-btn newDossier-button" 
                                onClick={this.props.newNoteDossier}>
                                {language[lan].addEvaluation}
                            </button>
                            : null
                        }
                    </div>
                    : null
                }
                
                <div className="dossierStudent-container">
                    {this.state.subjects
                        ? this.state.subjects.map((key, index) => (
                            <div className="dossierStudent-container-item" onClick={() => this.setState({subjectId: key.id_subject})}>
                                <h2 className="dossierStudent-title-evaluations">{key.name}
                                    <div>
                                        {this.state.media.map(item => (
                                            item[key.id_subject]
                                                ? item[key.id_subject].toFixed(2)
                                                : null
                                        ))}
                                        {this.state.subjectId === key.id_subject ? <Icon type="minus" /> : <Icon type="plus" />} 
                                    </div>
                                </h2>
                                {this.state.subjectId === key.id_subject
                                    ? this.state.data.map((key, index) => (
                                        key[this.state.subjectId]
                                            ? key[this.state.subjectId].map((key, index) => 
                                                <div className="dossierStudent-container-evaluations"><p>{key.title}</p> <p>{key.note}</p></div>
                                            )
                                            : null  
                                        ))
                                    : null
                                }
                            </div>
                        ))
                        : null
                    }
                    {this.state.test
                        ?<div className="dossierStudent-container-item" onClick={() => this.setState({subjectId: -1})}>
                            <h2 className="dossierStudent-title-evaluations">Test
                                {this.state.subjectId === -1 ? <Icon type="minus" /> : <Icon type="plus" />} 
                            </h2>
                            {this.state.subjectId === -1
                                ? this.state.test.map((key, index) => 
                                    <div className="dossierStudent-container-evaluations"><p>{key.title}</p> <p>{key.note ? key.note : '--'}</p></div>
                                )
                                : null
                            }
                        </div>
                        : null
                    }
                </div>
            </Modal>
        )
    }
}

export default withRouter(DossierStudent)