import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../styles/pages/Album.css';

class Album extends Component {
  state = {
    artist: '',
    albumName: '',
    albumImg: '',
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
    const albumImg = albumInfo.artworkUrl100;
    this.setState(
      {
        artist,
        albumName,
        albumImg,
        songsList: data,
        loading: false,
      },
    );
  };

  render() {
    const { artist, albumName, albumImg, songsList, loading } = this.state;
    const albumImage = albumImg.replace(/100x100bb.jpg/, /200x200bb.jpg/);

    return (
      <div
        data-testid="page-album"
        className="page_album"
      >

        <Header />

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

        { loading === true
          ? <Loading />
          : (
            <div className="div_songs">

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
