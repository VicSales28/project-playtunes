import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Title from '../components/Title';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
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
      <div className="login_containeir">

        <div
          className="login_form_containeir"
          data-testid="page-login"
        >

          <Title />

          {loading === true
            ? <Loading />
            : (
              <form>

                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={ this.handleChange }
                  value={ name }
                  data-testid="login-name-input"
                  className="login_name_input"
                  placeholder="Digite seu usuário"
                  onKeyPress={ (event) => this.handleKeyPress(event) }
                />

                <button
                  data-testid="login-submit-button"
                  className="login_submit_button"
                  type="button"
                  disabled={ name.length < minLength }
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>

              </form>
            )}
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
