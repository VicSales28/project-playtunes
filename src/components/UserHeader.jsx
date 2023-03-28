import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/components/UserHeader.css';

class UserHeader extends Component {
  render() {
    const { userName } = this.props;

    return (
      <div className="user_header">

        <img
          className="default_user_img"
          src="https://cdn.discordapp.com/attachments/1062029691860566078/1090289831667576852/user_318-790139.png"
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
