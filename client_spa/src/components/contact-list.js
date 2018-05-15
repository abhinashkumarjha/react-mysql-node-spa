import React from 'react';
import { Card } from 'semantic-ui-react';
import ContactCard from './contact-card';

export default function ContactList({contacts, deleteContact}){
  const cards = () => {
    console.log(contacts);
    return contacts.map(contact => {
      return (
        <ContactCard key={contact.key+contact.firstname} contact={contact} deleteContact={deleteContact}/>
      )
    })
  }

  return (
    <Card.Group>
      { cards() }
    </Card.Group>
  )
}
