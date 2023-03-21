import React, { Component } from 'react';
import { Loader } from 'react-feather';

import '../styles/components/Loading.css';

class Loading extends Component {
  render() {
    return (
      <h3 className="loading">
        <Loader />
        Carregando...
      </h3>
    );
  }
}

export default Loading;
