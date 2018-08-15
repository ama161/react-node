import React from 'react'
import { withRouter } from 'react-router'
import {message} from 'antd';

import language from '../../language/language'
import {userByRole} from '../../functions/userByRole';
import Header from '../utils/Header'
import {getByRole, getStudentDossier} from '../../services/user'
import {postTestStudent, getAllByStudent, putTestStudent} from '../../services/test';
import ParentInfoModal from './ParentInfoModal'
import DossierStudent from '../dossier/DossierStudent'
import TestItem from '../test/TestItem';
import TestQuestionsModal from '../test/TestQuestionsModal'
import CalendarStudent from './CalendarStudent';

class HomeStudent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            language: 0,
            student: null,
            dossier: null,
            studentDossier: null,
            studentId: '',
            viewModalParent: false,
            arrayClass: [],
            testId: '',
            modalQuestions: false,
            viewCalendar: false
        }
    }

    componentWillMount(){
        if(sessionStorage.length !== 0){
            userByRole()
            .then((result) => {
                if(result !== 'student') this.props.history.push('/login');
                else {
                    getByRole(sessionStorage.idUser, 'student')
                        .then(result => {
                            this.setState({student: result[0]})
                            getAllByStudent(result[0].id_student)
                            .then(result => this.setState({arrayClass: result}))
                        })
                }
            })
            .catch((err) => {
                this.props.history.push('/login');
            })
        }else{
            this.props.history.push('/login')
        }
    }

    onHandleDossier(){
        getStudentDossier(sessionStorage.idUser)
            .then(result => {
                console.log(result);
                this.setState({studentDossier: result, studentId: sessionStorage.idUser})}
            ).catch(err => console.log('err'))
    }

    onFinishTest(trueQuestions){
        let exist = false;
        for(let i = 0; i<this.state.arrayClass.length && !exist; i++){
            if(this.state.arrayClass[i].id_test === this.state.testId && this.state.arrayClass[i].note !== null){
                exist = true;
            }
        }

        let arrayCorrect = [];
        for(let i = 0; i<trueQuestions.length; i++){
            if(trueQuestions[i].correct){
                arrayCorrect.push(trueQuestions[i].id_question);
            }
        }
        
        let note = (10 * arrayCorrect.length) / trueQuestions.length;

        if(exist){
            putTestStudent({id_test: this.state.testId, note: note.toFixed(2)}, this.state.student.id_student)
            .then(result => {
                if(result.hasOwnProperty('msg'))
                    message[result.type](result.msg)
            })
            .catch(err => console.log(err))
        }
        else{
            postTestStudent({id_test: this.state.testId, note: note.toFixed(2)}, this.state.student.id_student)
            .then(result => {
                if(result.hasOwnProperty('msg'))
                    message[result.type](result.msg)
            })
            .catch(err => console.log(err))
        }

        getAllByStudent(this.state.student.id_student)
        .then(result => this.setState({testId: '', modalQuestions: false, arrayClass: result}))
    }

    render(){
        const lan = this.state.language;
        return(
            <div>
                <Header onChangeLanguage={(language) => this.setState({language: language})}/>
                <button 
                    class="ant-btn ant-btn-primary" 
                    onClick={() => this.setState({viewCalendar: !this.state.viewCalendar})}>
                    {language[lan].calendar}
                </button>
                {this.state.viewCalendar
                    ? <CalendarStudent/>
                    : null
                }
                <div className="container-info">
                    <p id="student_icon" className={(this.state.student) ? "icon " + this.state.student.student_icon : null}></p>
                    <div className="container-info-data">
                        <h1>{(this.state.student) ? this.state.student.student_name : null}</h1>
                        <div className="container-info-data-class">
                            <h2>
                                {(this.state.student) ? this.state.student.class_name : null}
                            </h2>
                            <p className={(this.state.student) ? "icon " + this.state.student.class_icon : null}></p>                            
                        </div>
                        <p className="container-info-data-parent" onClick={() => this.onHandleDossier()}>{language[lan].dossier}</p>
                    </div>
                </div>
                <div className="testView-testList" >
                    {this.state.arrayClass.map((index, item) => 
                        <TestItem 
                            title={index.title} 
                            description={index.description}
                            testId={index.id_test}
                            note={index.note}
                            onHandleTest={(testId) => this.setState({testId: testId, modalQuestions: true})}/>
                    )}
                </div>
                {this.state.studentDossier && this.state.studentId
                    ?   <DossierStudent 
                            student={this.state.studentDossier} 
                            visible={(this.state.studentId) ? true : false}
                            onHandleCancel={() => this.setState({studentId: '', studentDossier: null})}/>
                    : null
                }

                <div className="testView-modalQuestions">
                    {this.state.modalQuestions
                        ? <TestQuestionsModal 
                            testId={this.state.testId} 
                            onHandleCancel={() => this.setState({testId: '', modalQuestions: false})}
                            visible={this.state.modalQuestions}
                            onFinishTest={(trueQuestions) => this.onFinishTest(trueQuestions)}/>
                        : null
                    }
                </div>
                
            </div>
        )
    }
}

export default withRouter(HomeStudent);