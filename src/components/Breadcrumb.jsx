import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Breadcrumb extends Component {
  render() {
    const { route } = this.props;
    return (
      <nav className="theme-color">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item">
            {`${route}`}
          </li>
        </ol>
      </nav>
    );
  }
}

Breadcrumb.propTypes = {
  route: PropTypes.string.isRequired,
};

export default Breadcrumb;
