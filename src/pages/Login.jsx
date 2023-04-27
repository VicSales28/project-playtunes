import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Loading from '../components/Loading';
import Footer from '../components/Footer';
import logo from '../images/logo.png';
import { createUser } from '../services/userAPI';
import '../styles/pages/Login.css';

class Login extends Component {
  state = {
    name: '',
    loading: false,
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history: { push } } = this.props;

    this.setState({
      loading: true,
    });

    await createUser({ name });

    this.setState({
      loading: false,
    }, () => push('/search'));
  };

  handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  };

  render() {
    const { name, loading } = this.state;
    const minLength = 3;

    return (
      <div className="b-vr">

        <div
          className="containeir"
          data-testid="page-login"
        >

          <div className="row justify-content-center align-items-center dashboard">

            {loading === true
              ? <Loading />
              : (
                <form className="col-10 col-md-4 rounded-3 login-container p-5">

                  <div
                    className="row justify-content-center align-items-center text-center"
                  >

                    <img src={ logo } className="logo me-3" alt="Logo" />
                    <span className="fs-3 fw-bold title">
                      PlayTunes
                    </span>

                    <div className="input-group my-4">
                      <span className="input-group-text usericon">
                        <FontAwesomeIcon icon={ faUser } />
                      </span>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={ this.handleChange }
                        value={ name }
                        data-testid="login-name-input"
                        className="form-control input"
                        placeholder="Digite um nome de usuário"
                        onKeyPress={ (event) => this.handleKeyPress(event) }
                      />
                    </div>

                    <button
                      data-testid="login-submit-button"
                      className="btn btn-success submit mt-2"
                      type="button"
                      disabled={ name.length < minLength }
                      onClick={ this.handleClick }
                    >
                      Entrar
                    </button>

                  </div>
                </form>
              )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
