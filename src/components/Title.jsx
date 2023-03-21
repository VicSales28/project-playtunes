import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaHeadphones } from 'react-icons/fa';

class Title extends Component {
  render() {
    const { className } = this.props;
    return (
      <Link to="/">
        <h1
          className={ className }
        >
          <FaHeadphones size="2rem" />
          TrybeTunes
        </h1>
      </Link>
    );
  }
}

Title.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Title;
