import React, { Component } from 'react';
import '../styles/Login.scss';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className='font-H3'>
          <h3>
            Legal: This website is operated by GQ Capital Inc. with address at No.
            3289 Sarstoon Street, Belize City, Belize, Central America. GQ Capital Inc.
            is regulated by the International Financial Service Commission under its License IFSC/60/445/TS/18.
          </h3>
          <h3>
            The information on this site may be accessed worldwide however it is not directed at 
            residents in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.
            Products and services offered on this website are not intended for residents of Belize 
            and GQFX does not accept clients who are residents of Belize.
          </h3>
          <h3>
            Risk Warning: Forex trading involves very significant risk to your investment capital. 
            Please read and ensure full understanding of the Terms of Business and Risk Disclosure of GQFX.
          </h3>
        </div>
        <div className='font-H2'>
          <h2>
            © 2015 -2018 GQ CAPITAL INC. | LICENSE NO. IFSC/60/445/TS/18
          </h2>
        </div>
      </div>
    );
  }
}


export default Footer;
