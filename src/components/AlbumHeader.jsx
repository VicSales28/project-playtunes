import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/components/AlbumHeader.css';

class AlbumHeader extends Component {
  render() {
    const { albumImage, albumName, artist } = this.props;
    return (
      <header className="album_header">

        <img
          src={ albumImage }
          alt={ albumName }
          className="album_image"
        />

        <div className="album_info">
          <h2
            data-testid="album-name"
            className="album_name"
          >
            { albumName }
          </h2>
          <h3
            data-testid="artist-name"
            className="artist"
          >
            { artist }
          </h3>
        </div>

      </header>
    );
  }
}

AlbumHeader.propTypes = {
  albumImage: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default AlbumHeader;
