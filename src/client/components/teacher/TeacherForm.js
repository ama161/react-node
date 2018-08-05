import React from 'react'
import Input from '../utils/Input'
import language from '../../language/language'

class TeacherForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            language: 0,
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    render(){
        const lan = this.state.language;
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
            </div>
        )
    }
}

export default TeacherForm