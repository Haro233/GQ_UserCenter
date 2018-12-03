import React, { Component } from 'react';
import GQFXApp from './GQFXApp';
import '../styles/App.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import createHistory from 'history/createBrowserHistory';
import {BrowserRouter} from 'react-router-dom';
import "antd/dist/antd.css";

export const history = createHistory();
class App extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
          <GQFXApp />
      </BrowserRouter>
    );
  }
}

export default App;

