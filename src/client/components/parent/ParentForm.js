import React from 'react'
import Input from '../utils/Input'
import language from '../../language/language'
import SelectStudent from '../utils/select/SelectStudent'

class ParentForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            phone: '',
            name: '',
            student: '',
            language: '',
        }
    }

    onChangeStudent(value){
        this.setState({student: value}
            , () => {
                this.props.onHandleChange(this.state)
            })
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    render(){
        const lan = (this.state.language) ? this.state.language : 0;
        
        return(
            <div>
                <Input 
                    className="form-item"
                    value={this.state.email}
                    type="text" 
                    label={language[lan].email}
                    onChange={(event) => 
                        this.setState({email: event.target.value}
                        , () => {
                            this.props.onHandleChange(this.state)
                        })
                    }
                />
                <Input 
                    className="form-item"
                    value={this.state.phone}
                    type="text" 
                    label={language[lan].phone} 
                    onChange={(event) => 
                        this.setState({phone: event.target.value}
                        , () => {
                            this.props.onHandleChange(this.state)
                        })
                    }
                />
                <Input 
                    className="form-item"
                    value={this.state.name}
                    type="text" 
                    label={language[lan].name} 
                    onChange={(event) => 
                        this.setState({name: event.target.value}
                        , () => {
                            this.props.onHandleChange(this.state)
                        })
                    }
                />
                <div className="form-item">
                    <label>{language[lan].student}</label>
                    <SelectStudent onHandleChange={(value) => this.onChangeStudent(value)}/>
                </div>
            </div>
        )
    }
}

export default ParentForm