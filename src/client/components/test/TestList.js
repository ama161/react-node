import React from 'react';
import { getAll } from '../../services/test';
import TestItem from './TestItem';
import TestQuestionsModal from './TestQuestionsModal';
import TestClassModal from './TestClassModal';

class TestList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            test: [],
            modalClass: false,
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
                <div>
                    {this.state.modalClass
                        ? <TestClassModal 
                            testId={this.state.testId} 
                            onHandleCancel={() => this.setState({testId: '', modalClass: false})}
                            visible={this.state.modalClass}/>
                        : null
                    }
                </div>
                <div className="testView-testList">
                    {this.state.test.map((index, item) => 
                        <TestItem 
                            title={index.title} 
                            description={index.description}
                            testId={index.id_test}
                            onHandleTest={(testId) => this.setState({testId: testId, modalClass: true})}/>
                    )}
                </div>
            </div>
        )
    }
}

export default TestList;