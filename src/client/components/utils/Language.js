import React from 'react';
import {withRouter} from 'react-router-dom'

class Language extends React.Component {
    constructor(props){
        super(props);

        this.changeLanguage = this.changeLanguage.bind(this);        
        this.state = {

        }
    }

    changeLanguage(language){
        let languageNumber = 0;
        if(language === 'EN') languageNumber = 1;
        
        if(sessionStorage.hasOwnProperty('language')){
            sessionStorage.language = languageNumber;
            this.props.changeLanguage(languageNumber);
        }
    }

    render(){
        return(
            <p className="language-container">
                <span onClick={() => this.changeLanguage('ES')}>ES </span> 
                | <span onClick={() => this.changeLanguage('EN')}>EN</span>
            </p>
        )
    }
}

export default withRouter(Language)