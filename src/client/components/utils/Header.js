import React from 'react'
import { withRouter } from 'react-router'

import Language from './Language';
import language from '../../language/language';
import {logout} from '../../functions/logout';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.onHandleLogout = this.onHandleLogout.bind(this);
        this.state = {
            language: 0
        }
    }

    onHandleLogout(){
        logout();
        this.props.history.push('/');
    }

    render(){
        const lan = this.state.language;
        return (
            <div className="header">
                <p className="icon logo-header"></p>
                <div>
                    <Language 
                        changeLanguage={(language) => {
                            this.setState({language: sessionStorage.language});
                            this.props.onChangeLanguage(language);
                        }}/>
                    <button className="ant-btn" onClick={this.onHandleLogout}>{language[lan].logout}</button> 
                </div>                               
            </div>
        )
    }

}

export default withRouter(Header);