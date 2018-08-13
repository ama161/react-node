import React from 'react';
import { getAll } from '../../services/test';
import TestItem from './TestItem';
import TestQuestionsModal from './TestQuestionsModal';

class TestList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            test: [],
            modalQuestions: false,
            testId: ''
        }
    }

    componentWillMount(){
        getAll()
        .then(result => this.setState({test: result}))
    }

    render(){
        return(
            <div>
                <div className="testView-modalQuestions">
                {this.state.modalQuestions
                    ? <TestQuestionsModal 
                        testId={this.state.testId} 
                        onHandleCancel={() => this.setState({testId: '', modalQuestions: false})}
                        visible={this.state.modalQuestions}/>
                    : null
                }
                </div>
                <div className="testView-testList" >
                    {this.state.test.map((index, item) => 
                        <TestItem 
                            title={index.title} 
                            description={index.description}
                            testId={index.id_test}
                            onHandleTest={(testId) => this.setState({testId: testId, modalQuestions: true})}/>
                    )}
                </div>
            </div>
        )
    }
}

export default TestList;