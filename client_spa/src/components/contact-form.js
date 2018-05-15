import React, { Component } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';


class ContactForm extends Component {

  componentWillReceiveProps = (nextProps) => { // Receive Contact data Asynchronously
    const { contact } = nextProps;
    if(contact.key !== this.props.contact.key) { // Initialize form only once
      this.props.initialize(contact)
    }
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )

  render() {
    const { handleSubmit, pristine, submitting, loading } = this.props;

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>{this.props.contact.key ? 'Edit Contact' : 'Add New Contact'}</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Group widths='equal'>
              <Field name="firstname" type="text" component={this.renderField} label="First Name"/>
              <Field name="lastname" type="text" component={this.renderField} label="Last Name"/>
            </Form.Group>
            <Field name="mobile" type="text" component={this.renderField} label="mobile"/>
            <Field name="email" type="text" component={this.renderField} label="Email"/>
            <Field name="gender" type="text" component={this.renderField} label="Gender"/>
            <Field name="photo" type="text" component={this.renderField} label="Picture"/>
            <Button primary type='submit' disabled={pristine || submitting}>{this.props.contact.key ? 'Update' : 'Save'}</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const validate = (values) => {
  const errors = {name:{}};
  if(!values.name || !values.name.first) {
    errors.name.first = {
      message: 'You need to provide First Name'
    }
  }
  if(!values.mobile) {
    errors.mobile = {
      message: 'You need to provide a mobile number'
    }
  } else if(!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.mobile)) {
    errors.mobile = {
      message: 'mobile number must be in International format'
    }
  }
  if(!values.email) {
    errors.email = {
      message: 'You need to provide an Email address'
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      message: 'Invalid email address'
    }
  }
  return errors;
}

export default reduxForm({form: 'contact', validate})(ContactForm);
