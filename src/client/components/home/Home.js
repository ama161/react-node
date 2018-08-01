import React from 'react';
import { withRouter } from 'react-router'
import Box from '../utils/Box';
import language from '../../language/language'
import HeaderHome from './HeaderHome';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let lan = 0;
    return(
      <div>
        <HeaderHome/>
        <div className="home-boxes">
          <Box type="brown" typeIcon="icon-chat">
            <p>{language[lan].chat}</p>
          </Box>
          <Box type="brown" typeIcon="icon-blackboard">
            <p>{language[lan].class}</p>
          </Box>
          <Box type="brown" typeIcon="icon-file">
            <p>{language[lan].evaluation}</p>
          </Box>
          <Box type="brown" typeIcon="icon-calendar">
            <p>{language[lan].calendar}</p>
          </Box>
          <Box type="brown" typeIcon="icon-statistics">
            <p>{language[lan].statistics}</p>
          </Box>
          <Box type="brown" typeIcon="icon-test">
            <p>{language[lan].test}</p>
          </Box>
        </div>

      </div>
      
    )
  }
}

export default withRouter(Home)
