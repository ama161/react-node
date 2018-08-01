import React from 'react'
import Input from '../utils/Input'
import AnimalsContent from '../utils/AnimalsContent'
import language from '../../language/language'

class ClassForm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            name: ''
        }
    }

    render(){
        const lan = 0;
        return(
            <div>
                <AnimalsContent/>
                <Input 
                    className="form-item"
                    value={this.state.name}
                    type="text" 
                    label={language[lan].name} 
                    onChange={(event) => this.setState({name: event.target.value})}
                />
            </div>
        )
    }
}

export default ClassForm