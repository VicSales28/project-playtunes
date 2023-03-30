import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Loading from '../components/Loading';
import EditForm from '../components/EditForm';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/pages/ProfileEdit.css';

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

  handleClick = async () => {
    const { name, email, description, image } = this.state;
    const { history: { push } } = this.props;

    this.setState({
      loading: true,
    });

    await updateUser({ name, email, description, image });

    this.setState({
      loading: false,
    }, () => push('/profile'));
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
      <div
        className="profile"
        data-testid="page-profile-edit"
      >

        <Header />

        <div
          className="profile_container"
        >
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
                handleClick={ this.handleClick }
              />
            )}

        </div>

      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
