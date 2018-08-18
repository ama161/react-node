import React from 'react';
import language from '../../language/language'
import Input from '../utils/Input'
import SelectSubject from '../utils/select/SelectSubject';

class DossierForm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            title: '',
            note: '',
            subject: '',
            language: 0
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})        
    }

    onChangeSubject(value){
        this.setState({subject: value}
            , () => {
                this.props.onChangeDossier(this.state)
            })
    }

    render(){
        const lan = this.state.language
        return(
            <div>
                <Input 
                    className="form-item"
                    value={this.state.title}
                    type="text" 
                    label={language[lan].title} 
                    onChange={(event) => 
                        this.setState({title: event.target.value}, () => {
                            this.props.onChangeDossier(this.state)
                        })
                    }
                />
                <Input 
                    className="form-item"
                    value={this.state.note}
                    type="number" 
                    label={language[lan].note} 
                    onChange={(event) => 
                        this.setState({note: event.target.value}, () => {
                            this.props.onChangeDossier(this.state)
                        })
                    }
                />
                <div className="form-item">
                    <label>{language[lan].subject}</label>
                    <SelectSubject onHandleChange={(value) => this.onChangeSubject(value)}/>
                </div>
            </div>
        )
    }
}

export default DossierForm;