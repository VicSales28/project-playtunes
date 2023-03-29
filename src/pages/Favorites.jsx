import React, { Component } from 'react';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/pages/Favorites.css';

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
        className="page_favorites"
        data-testid="page-favorites"
      >
        <Header />

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
    );
  }
}

export default Favorites;
