import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditForm extends Component {
  render() {
    const {
      name,
      email,
      description,
      image,
      handleChange,
      isDisabled,
    } = this.props;
    return (
      <form>

        <label htmlFor="userNameInput">
          Usuário
          <input
            id="userNameInput"
            type="text"
            name="name"
            value={ name }
            onChange={ handleChange }
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
            onChange={ handleChange }
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
            onChange={ handleChange }
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
            onChange={ handleChange }
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
    );
  }
}

EditForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.string.isRequired,
};

export default EditForm;
