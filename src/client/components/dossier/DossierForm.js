import React from 'react';
import language from '../../language/language'
import Input from '../utils/Input'

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
                    type="text" 
                    label={language[lan].note} 
                    onChange={(event) => 
                        this.setState({note: event.target.value}, () => {
                            this.props.onChangeDossier(this.state)
                        })
                    }
                />
                <Input 
                    className="form-item"
                    value={this.state.subject}
                    type="text" 
                    label={language[lan].subject} 
                    onChange={(event) => 
                        this.setState({subject: event.target.value}, () => {
                            this.props.onChangeDossier(this.state)
                        })
                    }
                />
            </div>
        )
    }
}

export default DossierForm;