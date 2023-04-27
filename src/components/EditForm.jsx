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
      handleClick,
    } = this.props;
    return (
      <form className="d-flex flex-column align-items-center text-center field">
        <fieldset>

          <legend>Editar dados pessoais</legend>

          <label htmlFor="userNameInput">
            Usuário
            <input
              id="userNameInput"
              type="text"
              name="name"
              value={ name }
              onChange={ handleChange }
              data-testid="edit-input-name"
              className="form-control input"
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
              className="form-control input"
            />
          </label>

          <label htmlFor="descriptionInput">
            Descrição
            <input
              id="descriptionInput"
              name="description"
              value={ description }
              onChange={ handleChange }
              data-testid="edit-input-description"
              className="form-control input"
            />
          </label>

          <label htmlFor="imageInput">
            URL da imagem de perfil
            <input
              id="imageInput"
              type="text"
              name="image"
              value={ image }
              onChange={ handleChange }
              data-testid="edit-input-image"
              className="form-control input"
            />
          </label>

          <button
            type="button"
            data-testid="edit-button-save"
            className="btn btn-success w-50 submit mt-2"
            disabled={ isDisabled }
            onClick={ handleClick }
          >
            Editar
          </button>

        </fieldset>
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
  isDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default EditForm;
