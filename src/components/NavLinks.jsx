import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faHeart,
  faMusic,
  faMicrophone,
  faUserPen,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import Loading from './Loading';
import UserHeader from './UserHeader';
import { getUser } from '../services/userAPI';

class NavLinks extends Component {
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
      <ul className="nav nav-pills flex-column mb-auto">

        <li>
          <Link
            to="/search"
            data-testid="link-to-search"
            className="nav-link text-white d-none d-md-block"
          >
            <FontAwesomeIcon icon={ faMagnifyingGlass } />
            {' '}
            Pesquisar
          </Link>
        </li>

        <li>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="nav-link text-white d-none d-md-block"
          >
            <FontAwesomeIcon icon={ faHeart } />
            {' '}
            Favoritas
          </Link>
        </li>

        <li>
          <span className="nav-link text-white text-muted d-none d-md-block">
            <FontAwesomeIcon icon={ faMusic } />
            {' '}
            Playlists
          </span>
        </li>

        <li>
          <span className="nav-link text-white text-muted d-none d-md-block">
            <FontAwesomeIcon icon={ faMicrophone } />
            {' '}
            Podcasts
          </span>
        </li>

        <hr className="mt-4" />

        <li>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="d-flex nav-link text-white user-profile-bg"
          >
            <div className="d-flex justify-content-center align-items-center">
              { loading === true
                ? <Loading />
                : <UserHeader userName={ userName } />}
            </div>
          </Link>
        </li>

        <li>
          <li>
            <Link
              to="/profile/edit"
              data-testid="link-to-favorites"
              className="nav-link text-white d-none d-md-block"
            >
              <FontAwesomeIcon icon={ faUserPen } />
              {' '}
              Perfil
            </Link>
          </li>
        </li>

        <li>
          <Link
            to="/project-playtunes"
            data-testid="link-to-favorites"
            className="nav-link text-white d-none d-md-block"
          >
            <FontAwesomeIcon icon={ faRightFromBracket } />
            {' '}
            Sair
          </Link>
        </li>

      </ul>
    );
  }
}

export default NavLinks;
