import React from 'react';
import {withRouter} from 'react-router';
import Input from '../utils/Input'
import AvatarsContent from '../utils/AvatarsContent';
import language from '../../language/language';
import SelectClass from '../utils/select/SelectClass';
import SelectTeacherByClass from '../utils/select/SelectTeacherByClass';

class NotificationForm extends React.Component{
    constructor(props){
        super(props);

        this.onHandleChange = this.onHandleChange.bind(this);

        this.state={
            description: '',
            idTeacher: 0,
            idParent: 0,
            language: 0,
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language, idParent: this.props.parentId ? this.props.parentId : 0})
    }

    onHandleChange(event){
        this.setState({idTeacher: event}
            , () => {
                this.props.onChange(this.state)
            })
    }

    render(){
        const lan = this.state.language;
        return(
            <div>
                <div className="form-item">
                    <label>{language[lan].description}</label>
                    <textarea
                        value = {this.state.description}
                        onChange = {(event) => this.setState({description: event.target.value}, this.props.onChange(this.state))}
                    />
                </div>
                {this.props.history.location.pathname === '/homeParent/' || this.props.history.location.pathname === '/homeParent'
                    ? <div className="form-item">
                        <label>{language[lan].teacher}</label>
                        <SelectTeacherByClass 
                            onHandleChange={(value) => this.onHandleChange(value)}
                            classId={this.props.classId}/>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default withRouter(NotificationForm);