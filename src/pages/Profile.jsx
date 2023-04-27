import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SideMenu from '../components/SideMenu';
import Breadcrumb from '../components/Breadcrumb';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../styles/pages/Profile.css';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({
        name: user.name,
        email: user.email,
        description: user.description,
        image: user.image,
        loading: false,
      });
    });
  }

  render() {
    const {
      name,
      email,
      description,
      image,
      loading,
    } = this.state;
    const defaultImg = 'https://cdn.discordapp.com/attachments/1062029691860566078/1090289831667576852/user_318-790139.png';

    return (
      <div
        data-testid="page-profile"
      >

        <SideMenu />
        <div
          className="container-page"
        >
          <div className="row justify-content-center align-items-center mt-3">
            <div className="col-12 col-md-8">
              <Breadcrumb route="Usuário" />
              <hr />
              <div
                className="profile_container"
              >

                { loading === true
                  ? <Loading />
                  : (
                    <div
                      className="d-flex flex-column align-items-center text-center field"
                    >

                      <fieldset>

                        <legend>Dados Pessoais</legend>

                        <div className="left_container">
                          <img
                            src={ image || defaultImg }
                            alt=""
                            data-testid="profile-image"
                            className="profile_img"
                          />
                        </div>

                        <div className="right_container">

                          <h4>Usuário</h4>
                          <p>{ name }</p>

                          <h4>E-mail</h4>
                          <p>{ email || 'Nenhuma e-mail cadastrado' }</p>

                          <h4>Descrição</h4>
                          <p>{ description || 'Nenhuma descrição cadastrada' }</p>

                        </div>

                      </fieldset>
                    </div>
                  )}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
