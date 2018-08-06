import React from 'react'

import {
  HashRouter,
  Route
} from 'react-router-dom'

import Home from './components/home/Home';
import Register from './components/register/Register';
import Register2 from './components/register/Register2';
import Login from './components/register/Login';
import HomeTeacher from './components/homeTeacher/HomeTeacher';
import HomeStudent from './components/homeStudent/HomeStudent';
import HomeParent from './components/homeParent/HomeParent';
import HomeAdmin from './components/homeAdmin/HomeAdmin';

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
          <Route exact path="/homeTeacher" component={HomeTeacher}/>
          <Route exact path="/homeStudent" component={HomeStudent}/>
          <Route exact path="/homeParent" component={HomeParent}/>
        </div>
      </HashRouter>
    )
  }
}

export default Router
