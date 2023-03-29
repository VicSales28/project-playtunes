import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/components/MusicCard.css';

class MusicCard extends Component {
  state = {
    isFavorite: false,
    loading: false,
  };

  componentDidMount() {
    this.getFavorites();
  }

  handleCheck = async ({ target }) => {
    const wasChecked = target.checked;
    const { track } = this.props;
    this.setState({
      loading: true,
    });
    if (wasChecked) {
      await addSong(track);
      this.setState({
        loading: false,
        isFavorite: true,
      });
    }
  };

  getFavorites = async () => {
    const { track } = this.props;
    const favoritesSongs = await getFavoriteSongs(track);
    // console.log(favoritesSongs);

    const wasFavorited = favoritesSongs.find((song) => (
      song.trackName === track.trackName));

    if (wasFavorited) {
      this.setState({
        isFavorite: true,
      });
    }
  };

  render() {
    const { track: { trackName, previewUrl, trackId } } = this.props;
    const { isFavorite, loading } = this.state;
    return (
      <div className="track_container">

        <p className="track_name">{ trackName }</p>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>

        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          <input
            id={ trackId }
            type="checkbox"
            className="heart_switch"
            onChange={ this.handleCheck }
            value={ trackId }
            checked={ isFavorite }
          />
        </label>

        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
