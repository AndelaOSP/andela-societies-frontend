import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import SnackBar from '../../components/notifications/SnackBar';
import SingleInput from '../../common/SingleInput';
import Button from '../../common/Button';
import TextArea from '../../common/TextArea';
import FormError from '../../components/formErrors/FormError';

// actions
import { createCategory } from '../../actions/createCategoryActions';

// helpers
import validateFormFields from '../../helpers/validate';

// constants
import SNACKBARTIMEOUT from '../../constants/snackbarTimeout';

/**
   * @name CreateCategoryForm
   * @summary Returns Form
   * @returns Returns a form
   */
class CreateCategoryForm extends Component {
  /**
   * @name defaultPropTypes
   * @type {PropType}
  */
  static defaultProps = {
    message: {
      type: '',
      text: '',
    },
  }

  /**
   * @name propTypes
   * @type {PropType}
  */
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    createCategory: PropTypes.func.isRequired,
    message: PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
  };

  /**
   * CreateCategoryForm component class constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      name: '',
      supportsMultiple: false,
      description: '',
      errors: {},
    };
  }

  /**
   * @function componentDidUpdate
   * @summary Closes model after showing success message
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    const { message } = this.props;
    if (prevProps.message.type !== message.type && message.type === 'success') {
      setTimeout(() => this.cancelModal(), SNACKBARTIMEOUT);
    }
  }

  /**
   * @name handleCheck
   * @summary toggles state when checkbox is clicked
   * @returns {void}
   */
  handleCheck = () => {
    this.setState({
      supportsMultiple: !this.state.supportsMultiple,
    });
  }

  /**
   * @memberOf CreateCategoryForm
   * change event handler
   * @param {Event} event - change event on select input
   */
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    const errors = { ...this.state.errors };
    if (event.target.value) delete errors[event.target.name];
    this.setState({ errors });
  }

  handleAddEvent = () => {
    const {
      name,
      supportsMultiple,
      description,
      value,
    } = this.state;
    const category = {
      name,
      description,
      value,
    };
    this.setState({
      errors: validateFormFields(category),
    }, () => {
      if (Object.keys(this.state.errors).length === 0) {
        category.supports_multiple = supportsMultiple;
        this.props.createCategory(category);
      }
    });
  }

  /**
   * @name resetState
   * @summary resets state to clear form fields and error messages
   */
  resetState = () => {
    this.setState({
      name: '',
      value: '',
      supportsMultiple: false,
      description: '',
      errors: {},
    });
  }

  /**
   * @name cancelModal
   * @summary reset state and close modal
   */
  cancelModal = () => {
    this.resetState();
    this.props.closeModal();
  }

  renderValidationError = (field) => {
    if (typeof this.state.errors[field] !== 'undefined') {
      return this.state.errors[field];
    }
    return '';
  }

  render() {
    const { message } = this.props;
    return (
      <form>
        <div className='titleForm'>Create a Category</div>
        <SingleInput
          type='text'
          name='name'
          title='Name'
          value={this.state.name}
          handleChange={this.handleChange}
        />
        <span className='validate__errors'>
          {this.renderValidationError('name')}
        </span>
        <SingleInput
          type='number'
          name='value'
          value={this.state.value}
          title='Number of points'
          handleChange={this.handleChange}
        />
        <span className='validate__errors'>
          {this.renderValidationError('value')}
        </span>
        <div className='formField'>
          { /* eslint-disable */ }
          <label className='formField__label--checkbox'>Supports Multiple</label>
          { /* eslint-disable */ }
          <label className="switch">
            <input
              type='checkbox'
              name='supportsMultiple'
              className='create-category-checkbox'
              checked={this.state.supportsMultiple}
              onChange={this.handleCheck}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <FormError errors={this.state.errors} fieldName='points' />
        <TextArea
          title='Description'
          rows={5}
          resize={false}
          name='description'
          placeholder='keep it brief'
          handleChange={this.handleChange}
          value={this.state.description}
        />
        <span className='validate__errors'>
          {this.renderValidationError('description')}
        </span>
        <div>
          <Button
            name='fellowButtonSubmit'
            value='Create'
            className={`submitButton ${message && message.type === 'info' ? 'submitButton--disabled' : ''}`}
            onClick={this.handleAddEvent}
          />
          <Button
            name='fellowButtonCancel'
            value='Cancel'
            className='cancelButton'
            onClick={this.cancelModal}
          />
        </div>
        {
          message && <SnackBar message={message} />
        }
      </form>
    );
  }
}

const mapStateToProps = state => ({
  message: state.categories.message,
});

export default connect(mapStateToProps, {
  createCategory,
})(CreateCategoryForm);
