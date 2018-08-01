import React from 'react'
import Language from './Language';
import language from '../../language/language';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        const lan = 0;
        return (
            <div className="header">
                <button className="button-fill" onClick={() => this.handleLogout()}>{language[lan].logout}</button>                
                <Language/>
            </div>
        )
    }

}

export default Header