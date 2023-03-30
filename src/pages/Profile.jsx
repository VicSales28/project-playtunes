import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaEdit } from 'react-icons/fa';

import Header from '../components/Header';
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
    const { history: { push } } = this.props;
    const defaultImg = 'https://cdn.discordapp.com/attachments/1062029691860566078/1090289831667576852/user_318-790139.png';

    return (
      <div
        className="profile"
        data-testid="page-profile"
      >

        <Header />

        <div
          className="profile_container"
        >

          { loading === true
            ? <Loading />
            : (
              <div className="containeir_fields">

                <fieldset className="fieldset_profile">

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

                  <button
                    type="button"
                    onClick={ () => push('/profile/edit') }
                    className="edit_button"
                  >
                    <FaEdit />
                    {' '}
                    Editar perfil
                  </button>

                </fieldset>
              </div>
            )}

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
