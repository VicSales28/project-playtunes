import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Loading from './Loading';
import { getUser } from '../services/userAPI';
// import '../styles/components/Header.css';

class Header extends Component {
  state = {
    userName: '',
    loading: true,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const user = await getUser();
    // console.log(user);

    this.setState({
      userName: user.name,
      loading: false,
    });
  };

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {loading === true
          ? <Loading />
          : <p data-testid="header-user-name">{userName}</p>}
        <div>
          <nav>
            <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
