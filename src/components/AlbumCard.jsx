import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/components/AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const {
      artistName,
      artUrl,
      collectionName,
      collectionId,
    } = this.props;
    const image = artUrl.replace(/100x100bb.jpg/, /200x200bb.jpg/);

    return (
      <div className="albumstyle">

        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className="album_card"
        >

          <img
            src={ image }
            alt={ `${artistName}` }
            className="album_img"
          />

          <h3 className="album_title">{ collectionName }</h3>

          <p className="artist_name">{ artistName }</p>

        </Link>

      </div>
    );
  }
}

AlbumCard.propTypes = {
  collectionId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  artUrl: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default AlbumCard;
