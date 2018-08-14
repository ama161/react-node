import React from 'react';
import {withRouter} from 'react-router';
import {Icon} from 'antd';
import Modal from '../utils/Modal'
import {getByRole} from '../../services/user'
import language from '../../language/language'

class DossierStudent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            subjects: {},
            data: {},
            subjectId: '',
            viewModal: '',
            language: 0,
        }
    }

    componentWillMount(){
        this.setState({
            data: this.props.student.data, 
            subjects: this.props.student.subjects, 
            viewModal: this.props.visible,
            test: this.props.student.test,
            language: sessionStorage.language
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.student.data, 
            subjects: nextProps.student.subjects, 
            viewModal: nextProps.visible,
            test: nextProps.student.test,
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
                {this.props.history.location.pathname !== '/homeTeacher'
                    ? null
                    : <button 
                        class="ant-btn ant-btn-primary" 
                        onClick={this.props.newNoteDossier}>
                        {language[lan].addEvaluation}
                    </button>
                }
                <div className="dossierStudent-container">
                    {this.state.subjects
                        ? this.state.subjects.map((key, index) => (
                            <div className="dossierStudent-container-item" onClick={() => this.setState({subjectId: key.id_subject})}>
                                <h2>{key.name} 
                                    {this.state.subjectId === key.id_subject ? <Icon type="minus" /> : <Icon type="plus" />} 
                                </h2>
                                {this.state.subjectId === key.id_subject
                                    ? this.state.data.map((key, index) => (
                                        key[this.state.subjectId]
                                            ? key[this.state.subjectId].map((key, index) => 
                                                <div><p>{key.title}</p> <p>{key.note}</p></div>
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
                            <h2>Test
                                {this.state.subjectId === -1 ? <Icon type="minus" /> : <Icon type="plus" />} 
                            </h2>
                            {this.state.subjectId === -1
                                ? this.state.test.map((key, index) => 
                                    <div><p>{key.title}</p> <p>{key.note ? key.note : '--'}</p></div>
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