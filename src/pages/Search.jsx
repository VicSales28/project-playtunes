import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

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
    // console.log(researched);
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

  render() {
    const { searchIput, loading, artistSearched, albumsList } = this.state;
    const minLength = 2;

    return (
      <div data-testid="page-search">

        <Header />

        { loading === true
          ? <Loading />
          : (
            <div className="search-container">
              <form>

                <input
                  id="searchInput"
                  type="text"
                  name="searchIput"
                  onChange={ this.handleChange }
                  value={ searchIput }
                  data-testid="search-artist-input"
                />

                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ searchIput.length < minLength }
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>

              </form>

              {artistSearched && (
                <p>
                  {`Resultado de álbuns de: ${artistSearched}`}
                </p>
              )}

              {albumsList.length === 0
                ? <p>Nenhum álbum foi encontrado</p>
                : (
                  <div className="albums-container">

                    {albumsList.map((album) => (
                      <AlbumCard
                        key={ album.artistId }
                        collectionId={ album.collectionId }
                        artistName={ album.artistName }
                        artworkUrl100={ album.artworkUrl100 }
                        collectionName={ album.collectionName }
                      />))}

                  </div>
                )}

            </div>
          )}
      </div>

    );
  }
}

export default Search;
