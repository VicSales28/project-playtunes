import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artist: '',
    albumName: '',
    songsList: [],
    loading: true,
  };

  componentDidMount() {
    this.getAlbumSongs();
  }

  getAlbumSongs = async () => {
    const { match: { params: { id } } } = this.props;

    const data = await getMusics(id);
    const albumInfo = data[0];
    const artist = albumInfo.artistName;
    const albumName = albumInfo.collectionName;
    this.setState(
      {
        artist,
        albumName,
        songsList: data,
        loading: false,
      },
    );
  };

  render() {
    const { artist, albumName, songsList, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h3 data-testid="album-name">{ albumName }</h3>
          <h4 data-testid="artist-name">{ artist }</h4>
        </div>

        { loading === true
          ? <Loading />
          : (
            <div>

              {songsList.map((track, index) => (
                index > 0
                && <MusicCard
                  key={ track.trackId }
                  track={ track }
                />
              ))}

            </div>
          )}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Album;
