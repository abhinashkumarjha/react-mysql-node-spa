import React, { Component} from 'react';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import ContactForm from '../components/contact-form';
import { newContact, saveContact, fetchContact, updateContact } from '../actions/contact-actions';

class ContactFormPage extends Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    console.log(this.props.contact);
    const _id = this.props.match.params.id;
    if(_id){
      this.props.fetchContact(_id)
    } else {
      this.props.newContact();
    }
  }

submit = (contact) => {
  console.log(contact);
  if(!contact.key) {
    return this.props.saveContact(contact)
      .then(response => this.setState({ redirect:true }))
      .catch(err => {
         throw new SubmissionError(this.props.errors)
       })
  } else {
    console.log("updated")
    return this.props.updateContact(contact)
      .then(response => this.setState({ redirect:true }))
      .catch(err => {
         throw new SubmissionError(this.props.errors)
       })
  }
}

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/" /> :
          <ContactForm contact={this.props.contact} loading={this.props.loading} onSubmit={this.submit} />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contact: state.contactStore.contact,
    errors: state.contactStore.errors
  }
}

export default connect(mapStateToProps, {newContact, saveContact, fetchContact, updateContact})(ContactFormPage);
