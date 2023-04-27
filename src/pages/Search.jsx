import React, { Component } from 'react';

import SideMenu from '../components/SideMenu';
import Breadcrumb from '../components/Breadcrumb';
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
      <>
        <SideMenu />
        <div
          className="container-page"
          data-testid="page-search"
        >
          <div className="row justify-content-center align-items-center mt-3">
            <div className="col-12 col-md-8">
              <Breadcrumb route="Pesquisar" />
              <hr />
              { loading === true
                ? <Loading />
                : (
                  <>
                    <form className="input-group mb-3">

                      <input
                        id="searchInput"
                        type="text"
                        name="searchIput"
                        onChange={ this.handleChange }
                        value={ searchIput }
                        data-testid="search-artist-input"
                        className="form-control input-search"
                        placeholder="Nome do Artista"
                        onKeyPress={ (event) => this.handleKeyPress(event) }
                      />

                      <button
                        data-testid="search-artist-button"
                        type="button"
                        disabled={ searchIput.length < minLength }
                        onClick={ this.handleClick }
                        className="input-group-text username"
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
          </div>
        </div>
      </>

    );
  }
}

export default Search;
