import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import '../styles/pages/NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div
        className="page_not_found"
        data-testid="page-not-found"
      >

        <Header />

        <div className="page_instructions">

          <h1>Ops, 404. Not Found</h1>

          <Link to="/">
            <button
              type="button"
              className="not_found_button"
            >
              Retornar
            </button>
          </Link>

        </div>
      </div>
    );
  }
}

export default NotFound;
