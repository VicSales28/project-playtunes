import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    searchIput: '',
    loading: false,
    artistSearched: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  handleClick = async () => {
    const { searchIput } = this.state;
    this.setState({
      loading: true,
    });
    await searchAlbumsAPI({ searchIput });
    this.setState({
      loading: false,
      searchIput: '',
      artistSearched: searchIput,
    });
  };

  render() {
    const { searchIput, loading, artistSearched } = this.state;
    const minLength = 2;

    return (
      <div data-testid="page-search">

        <Header />

        { loading === true ? <Loading />
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

            </div>
          )}
      </div>

    );
  }
}

export default Search;
