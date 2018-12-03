import React, { Component } from 'react';
import Login from './Login';
import User from './User';
import '../styles/App.scss';
import Axios from 'axios';
import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";



Axios.defaults.baseURL = 'https://api.gqfxcn.com/center';
// Axios.defaults.headers.post['Content-Type'] = 'application/json'
// Axios.defaults.headers.get['Content-Type'] = 'application/json'
Axios.defaults.headers.post['x-api-agent'] = '32db75a0a1eb11e89f4fcae7d8f1e761'
Axios.defaults.headers.get['x-api-agent'] = '32db75a0a1eb11e89f4fcae7d8f1e761'




class GQFXApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="GQFXApp">
          <Switch>
            <Route exact path="/"  render={() => <Redirect to="/Login" />}/>
            <Route path="/Login"  component={Login} /> />
            <Route path="/User"  component={User} /> />
          </Switch>
      </div>
    );
  }
}

export default withRouter(GQFXApp);

