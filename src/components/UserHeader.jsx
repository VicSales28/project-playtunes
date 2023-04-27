import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getUser } from '../services/userAPI';
import '../styles/components/UserHeader.css';

class UserHeader extends Component {
  state = {
    image: '',
  };

  componentDidMount() {
    this.getUserImg();
  }

  getUserImg = async () => {
    const user = await getUser();

    this.setState({
      image: user.image,
    });
  };

  render() {
    const { userName } = this.props;
    const { image } = this.state;
    const defaultImg = 'https://cdn.discordapp.com/attachments/1062029691860566078/1090289831667576852/user_318-790139.png';

    return (
      <>
        <img
          className="user-img rounded-circle me-2 d-none d-md-block"
          src={ image || defaultImg }
          alt="default_user_img"
        />

        <span
          className="user d-none d-md-block"
          data-testid="header-user-name"
        >
          { userName }
        </span>
      </>
    );
  }
}

UserHeader.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default UserHeader;
