import React, { Component } from 'react';
import Footer from '../components/Footer';
import Section from '../components/Section';
import Nav from '../components/Nav';
import MenuLIst from '../components/MenuLIst';
import Axios from 'axios';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import '../styles/User.scss';
// import zh from 'react-intl/locale-data/zh';
// import en from 'react-intl/locale-data/en';
// import zh_CN from '../locale/zh-CN.js';    
// import en_US from '../locale/en-US.js';


// addLocaleData([...en, ...zh]); 
// let messages = {};
// messages["en-US"] = en_US;
// messages["zh-CN"] = zh_CN;





class User extends Component {
  constructor(props){        
    super(props)         
  };
  state = {
    key: {}, 
  }
  componentWillMount = () => {
    const key = JSON.parse(sessionStorage.getItem('key'));
    if(key == null){
      this.props.history.push('/User');
    }else{
      this.setState ({
        key: key,
      })
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + key.access_token;
    }
    
  }
  componentDidMount = () => {
    
  }
  
  render() {
    // console.log(this.state.key);
    return (
      // <IntlProvider locale={'zh'} messages={zh_CN}>
        <div>
          <Nav />
          <MenuLIst />
          
        </div>
      // </IntlProvider>
    )
  }
}


export default (withRouter(User));
