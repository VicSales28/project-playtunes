import React, { Component } from 'react';

import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    isDisabled: true,
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
      }, this.toValidateInputs);
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.toValidateInputs);
  };

  toValidateInputs() {
    const { name, email, description, image } = this.state;

    const minLength = 3;
    const inputsAreValid = name.length >= minLength
    && description.length >= minLength
    && image.length >= minLength;

    const basicValidation = /\S+@\S+\.\S+/;
    const emailIsValid = basicValidation.test(email);

    this.setState({
      isDisabled: !(inputsAreValid && emailIsValid),
    });
  }

  render() {
    const { name, email, description, image, isDisabled, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>

          { loading === true
            ? <Loading />
            : (
              <form>

                <label htmlFor="userNameInput">
                  Usuário
                  <input
                    id="userNameInput"
                    type="text"
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                    data-testid="edit-input-name"
                  />
                </label>

                <label htmlFor="emailInput">
                  E-mail
                  <input
                    id="emailInput"
                    type="email"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                    data-testid="edit-input-email"
                  />
                </label>

                <label htmlFor="descriptionInput">
                  Descrição
                  <input
                    id="descriptionInput"
                    type="text"
                    name="description"
                    value={ description }
                    onChange={ this.handleChange }
                    data-testid="edit-input-description"
                  />
                </label>

                <label htmlFor="imageInput">
                  Imagem
                  <input
                    id="imageInput"
                    type="text"
                    name="image"
                    value={ image }
                    onChange={ this.handleChange }
                    data-testid="edit-input-image"
                  />
                </label>

                <button
                  type="button"
                  data-testid="edit-button-save"
                  className="edit_button_save"
                  disabled={ isDisabled }
                >
                  Editar
                </button>

              </form>
            )}
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
