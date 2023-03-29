import React, { Component } from 'react';

import '../styles/components/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div>
          <p>
            <strong>Project TrybeTunes</strong>
            {' '}
            by
            {' '}
            <a className="link_footer" href="https://github.com/VicSales28">Victoria Sales</a>
            . This project was developed during my time studying React at
            <a className="link_footer" href="https://www.betrybe.com/"> Trybe Programming School</a>
            .
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
