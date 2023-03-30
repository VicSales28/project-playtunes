import React, { Component } from 'react';

import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/pages/Search.css';

class Search extends Component {
  state = {
    searchIput: '',
    loading: false,
    artistSearched: '',
    albumsList: [],
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  handleClick = async () => {
    const { searchIput } = this.state;
    const researched = searchIput;

    this.setState({
      loading: true,
    });

    const albums = await searchAlbumsAPI(researched);

    this.setState({
      loading: false,
      searchIput: '',
      artistSearched: searchIput,
      albumsList: albums,
    });
  };

  handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  };

  render() {
    const {
      searchIput,
      loading,
      artistSearched,
      albumsList,
    } = this.state;
    const minLength = 2;

    return (
      <div
        className="page_search"
        data-testid="page-search"
      >

        <Header />

        { loading === true
          ? <Loading />
          : (
            <>
              <form className="search_form">

                <input
                  id="searchInput"
                  type="text"
                  name="searchIput"
                  onChange={ this.handleChange }
                  value={ searchIput }
                  data-testid="search-artist-input"
                  className="search_artist_input"
                  placeholder="Nome do Artista"
                  onKeyPress={ (event) => this.handleKeyPress(event) }
                />

                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ searchIput.length < minLength }
                  onClick={ this.handleClick }
                  className="search_artist_button"
                >
                  Pesquisar
                </button>

              </form>

              {artistSearched && (
                <h4 className="search_result">
                  {`Resultado de álbuns de: ${artistSearched}`}
                </h4>
              )}

              {albumsList.length === 0
                ? <h4 className="search_result">Nenhum álbum foi encontrado</h4>
                : (
                  <div className="albums-container">
                    {albumsList.map((album) => (
                      <AlbumCard
                        key={ album.collectionId }
                        collectionId={ album.collectionId }
                        artistName={ album.artistName }
                        artUrl={ album.artworkUrl100 }
                        collectionName={ album.collectionName }
                      />))}
                  </div>
                )}

            </>

          )}
      </div>

    );
  }
}

export default Search;
