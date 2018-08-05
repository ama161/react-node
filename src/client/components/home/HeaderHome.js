import React from 'react';
import { withRouter } from 'react-router'

import Language from '../utils/Language';
import language from '../../language/language'

class HeaderHome extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            language: ''
        }
    }

    componentWillMount(){
        this.setState({language: sessionStorage.language})
    }

    render(){
        let lan = (this.state.language) ? this.state.language : 0;

        return(
            <div className="home-buttons">
                <button className="button-fill" onClick={() => this.props.history.push("/login")}>{language[lan].login}</button>
                <Language changeLanguage={(language) => {
                    this.setState({language: language});
                    this.props.onChangeLanguage(language);
                }}/>
            </div>
        )
    }
}

export default withRouter(HeaderHome)