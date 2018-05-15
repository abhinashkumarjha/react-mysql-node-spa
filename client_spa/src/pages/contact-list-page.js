import React, { Component} from 'react';
import { connect } from 'react-redux';
import ContactList from '../components/contact-list';
import { fetchContacts, deleteContact, getContactList } from '../actions/contact-actions';


class ContactListPage extends Component {

  componentDidMount() {
    this.props.fetchContacts();
  }


  render() {
    return (
      <div className="container">
        <h1>List of Contacts</h1>
        <div className="ui basic button" onClick={this.props.getContactList}> Export CSV </div>
        <ContactList contacts={this.props.contacts} deleteContact={this.props.deleteContact}/>
      </div>
    )
  }
}

// Make contacts  array available in  props
function mapStateToProps(state) {
  return {
      contacts : state.contactStore.contacts
  }
}

export default connect(mapStateToProps, {fetchContacts,deleteContact,getContactList})(ContactListPage);
