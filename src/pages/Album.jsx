import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SideMenu from '../components/SideMenu';
import Breadcrumb from '../components/Breadcrumb';
import AlbumHeader from '../components/AlbumHeader';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

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
      >

        <SideMenu />
        <div
          className="container-page"
          data-testid="page-search"
        >
          <div className="row justify-content-center align-items-center mt-3">
            <div className="col-12 col-md-8">
              <Breadcrumb route="Álbum selecionado" />
              <hr />

              <AlbumHeader
                albumImage={ albumImage }
                albumName={ albumName }
                artist={ artist }
              />

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
          </div>
        </div>
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
