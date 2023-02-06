import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { artistName, artwrokUrl100, collectionName, collectionId } = this.props;
    return (
      <div className="album-card">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <p>{ artistName }</p>

          <img
            src={ artwrokUrl100 }
            alt={ `${artistName}` }
          />

          <p>{ collectionName }</p>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  collectionId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  artwrokUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default AlbumCard;
