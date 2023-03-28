import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Title from './Title';
import Loading from './Loading';
import UserHeader from './UserHeader';
import { getUser } from '../services/userAPI';
import '../styles/components/Header.css';

class Header extends Component {
  state = {
    loading: true,
    userName: '',
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const user = await getUser();
    // console.log(user);

    this.setState({
      loading: false,
      userName: user.name,
    });
  };

  render() {
    const { loading, userName } = this.state;
    return (
      <header
        className="header_component"
        data-testid="header-component"
      >

        <Title />

        <div
          className="header_links"
        >

          <nav className="nav_links">
            <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>

          <div className="user_link">
            { loading === true
              ? <Loading />
              : <UserHeader userName={ userName } />}
          </div>

        </div>

      </header>
    );
  }
}

export default Header;
