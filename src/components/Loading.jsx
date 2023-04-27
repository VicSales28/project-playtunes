import React, { Component } from 'react';
import { PropagateLoader } from 'react-spinners';

class Loading extends Component {
  render() {
    return (
      <div align="center">
        <PropagateLoader
          color="rgba(35, 25, 48, 0.834)"
          size={ 10 }
        />
      </div>
    );
  }
}

export default Loading;
