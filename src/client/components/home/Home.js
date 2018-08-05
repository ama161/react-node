import React from 'react';
import { withRouter } from 'react-router'
import Box from '../utils/Box';
import language from '../../language/language'
import HeaderHome from './HeaderHome';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      language: 0
    }
  }

  componentWillMount(){
    this.setState({language: sessionStorage.language})
  }

  render(){
    let lan = (this.state.language) ? this.state.language : 0;

    return(
      <div>
        <HeaderHome onChangeLanguage={(language) => this.setState({language: language})}/>
        <div className="home-boxes">
          <Box type="brown" typeIcon="icon-chat">
            <p>{language[lan].chatHOME}</p>
          </Box>
          <Box type="brown" typeIcon="icon-blackboard">
            <p>{language[lan].classHOME}</p>
          </Box>
          <Box type="brown" typeIcon="icon-file">
            <p>{language[lan].evaluationHOME}</p>
          </Box>
          <Box type="brown" typeIcon="icon-calendar">
            <p>{language[lan].calendarHOME}</p>
          </Box>
          <Box type="brown" typeIcon="icon-statistics">
            <p>{language[lan].statisticsHOME}</p>
          </Box>
          <Box type="brown" typeIcon="icon-test">
            <p>{language[lan].testHOME}</p>
          </Box>
        </div>

      </div>
      
    )
  }
}

export default withRouter(Home)
