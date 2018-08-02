import React from 'react'

import {
  HashRouter,
  Route
} from 'react-router-dom'

import Home from './components/home/Home';
import Register from './components/register/Register';
import Register2 from './components/register/Register2';
import Login from './components/register/Login';
// import HomeUser from './components/homeUser/HomeUserContainer';
// import HomeTeacher from './components/homeTeacher/HomeTeacher';
import HomeAdmin from './components/homeAdmin/HomeAdmin';
// import LoginTeacher from './components/register/LoginTeacherContainer';

class Router extends React.Component{
  constructor(props){
    super(props);

    this.state={}
  }

  render(){
    return(
      <HashRouter>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/register2" component={Register2}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/homeAdmin" component={HomeAdmin}/>
          
          {/*      
          <Route exact path="/homeUser" component={HomeUser}/>
          <Route exact path="/homeTeacher" component={HomeTeacher}/>
          <Route exact path="/loginTeacher" component={LoginTeacher}/> */}
        </div>
      </HashRouter>
    )
  }
}

export default Router
