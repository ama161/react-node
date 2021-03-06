import React from 'react'
import Input from '../utils/Input'
import AnimalsContent from '../utils/AnimalsContent'
import language from '../../language/language'

class ClassForm extends React.Component{
    constructor(props){
        super(props);

        this.onHandleIcon = this.onHandleIcon.bind(this);

        this.state={
            name: '',
            language: ''
        }
    }

    onHandleIcon(avatar){
        this.setState({icon: avatar}
            , () => {
                this.props.onChangeClass(this.state)
            })
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})        
    }

    render(){
        const lan = (this.state.language) ? this.state.language : 0;;
        return(
            <div>
                <AnimalsContent onHandleClick={(icon) => this.onHandleIcon(icon)}/>
                <Input 
                    className="form-item"
                    value={this.state.name}
                    type="text" 
                    label={language[lan].name} 
                    onChange={(event) => 
                        this.setState({name: event.target.value}, () => {
                            this.props.onChangeClass(this.state)
                        })
                    }
                />
            </div>
        )
    }
}

export default ClassForm