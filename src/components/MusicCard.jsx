import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            type="checkbox"
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
