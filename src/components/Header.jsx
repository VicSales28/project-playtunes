import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
    console.log(user);
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
      </header>
    );
  }
}

export default Header;
