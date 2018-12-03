import React, { Component } from 'react';
import logo from '../images/123.png';
import Footer from '../components/Footer';
import Section from '../components/Section';
import {connect} from "react-redux";

import '../styles/Login.scss';
// import zh from 'react-intl/locale-data/zh';
// import en from 'react-intl/locale-data/en';
// import zh_CN from '../locale/zh-CN.js';    
// import en_US from '../locale/en-US.js';


// addLocaleData([...en, ...zh]); 
// let messages = {};
// messages["en-US"] = en_US;
// messages["zh-CN"] = zh_CN;

class Login extends Component {

  
  render() {
    return (
      // <IntlProvider locale={'zh'} messages={zh_CN}>
        <div className="Login">
          <div className='logo'>
            <img src={logo} />
          </div>
          <Section/>
          <Footer/>
        </div>
      // </IntlProvider>
    );
  }
}


export default Login;
