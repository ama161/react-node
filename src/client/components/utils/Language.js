import React from 'react';

class Language extends React.Component {
    constructor(props){
        super(props);

        this.changeLanguage = this.changeLanguage.bind(this);        
        this.state = {

        }
    }

    changeLanguage(language){
        console.log(language);
        let languageNumber = 0;
        if(language === 'EN') languageNumber = 1;
    
        this.props.updateLanguage(languageNumber)
    }

    render(){
        return(
            <p>
                <span onClick={() => this.changeLanguage('ES')}>ES</span> 
                | <span onClick={() => this.changeLanguage('EN')}>EN</span>
            </p>
        )
    }
}

export default Language