import React, { Component } from 'react';

import Header from '../components/Header';
import Loading from '../components/Loading';
import EditForm from '../components/EditForm';
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
    const {
      name,
      email,
      description,
      image,
      isDisabled,
      loading,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">

        <Header />

        { loading === true
          ? <Loading />
          : (
            <EditForm
              name={ name }
              email={ email }
              description={ description }
              image={ image }
              handleChange={ this.handleChange }
              isDisabled={ isDisabled }
            />
          )}

      </div>
    );
  }
}

export default ProfileEdit;
