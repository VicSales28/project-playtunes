import React, { Component } from 'react';

import SideMenu from '../components/SideMenu';
import Breadcrumb from '../components/Breadcrumb';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    loading: true,
  };

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, loading: false });
  };

  toRemoveSong() {
    this.setState({ loading: true }, this.getFavorites());
  }

  render() {
    const { favoriteSongs, loading } = this.state;

    return (
      <div
        data-testid="page-favorites"
      >
        <SideMenu />
        <div
          className="container-page"
          data-testid="page-search"
        >
          <div className="row justify-content-center align-items-center mt-3">
            <div className="col-12 col-md-8">
              <Breadcrumb route="Favoritas" />
              <hr />
              { loading === true
                ? <Loading />
                : (
                  <div className="favorites_songs_container">

                    {favoriteSongs.map((track) => (
                      <MusicCard
                        key={ track.trackId }
                        track={ track }
                        status={ this.toRemoveSong }
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

export default Favorites;
