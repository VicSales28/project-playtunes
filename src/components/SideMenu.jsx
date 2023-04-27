import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import '../styles/components/SideMenu.css';
import logo from '../images/logo.png';

class SideMenu extends Component {
  render() {
    return (
      <header
        className="d-flex flex-column flex-shrink-0 p-3 sidebar"
        data-testid="header-component"
      >

        <Link
          to="/search"
          className="d-flex align-items-center mb-3 mb-md-0 text-decoration-none"
        >
          <img src={ logo } className="logo me-3" alt="Logo" />
          <span className="fs-3 fw-bold title">
            PlayTunes
          </span>
        </Link>

        <hr />

        <NavLinks />
      </header>
    );
  }
}

export default SideMenu;
