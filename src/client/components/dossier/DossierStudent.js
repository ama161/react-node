import React from 'react';
import {getByRole} from '../../services/user'

class DossierStudent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dossiers: {}
        }
    }

    componentWillMount(){
        this.setState({dossiers: this.props.student})
    }

    render(){
        return(
            <div className="dossierStudent-container">
                {Object.values(this.props.student).map((key, index) => (
                    <div className="dossierStudent-container-item">
                        <h2>{key.subject}</h2>
                        <p>{key.title} - {key.note}</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default DossierStudent