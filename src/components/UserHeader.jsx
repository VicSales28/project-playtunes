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
      <div className="user_header">
        <img
          className="default_user_img"
          src={ image || defaultImg }
          alt="default_user_img"
        />

        <h3
          className="user_name"
          data-testid="header-user-name"
        >
          { userName }
        </h3>
      </div>
    );
  }
}

UserHeader.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default UserHeader;
