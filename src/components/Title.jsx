import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaHeadphones } from 'react-icons/fa';

import '../styles/components/Title.css';

class Title extends Component {
  render() {
    return (
      <Link to="/">

        <h1 className="title">
          <FaHeadphones size="2rem" />
          TrybeTunes
        </h1>

      </Link>
    );
  }
}

export default Title;
