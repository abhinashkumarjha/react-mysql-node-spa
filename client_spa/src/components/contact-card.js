import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function ContactCard({contact, deleteContact}) {
  return (
    <Card id={contact.key+contact.firstname}>
      <Card.Content>
      <Card.Header>
        <Icon name='user outline'/> {contact.firstname} {contact.lastname}
      </Card.Header>
      <Card.Description>
        <div className="ui internally celled grid">
          <div className="twelve wide column">
              <p><Icon name='phone'/> {contact.mobile}</p>
              <p><Icon name='mail outline'/> {contact.email}</p>
          </div>
          <div className="four wide column">
            <div className="ui small image">
              <img src={contact.photo} alt="!oops sorry!!!!"/>
            </div>
          </div>
        </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className="ui two buttons">
        <Link to={`/contacts/edit/${contact.key}`} className="ui basic button green">Edit</Link>
        <Button basic color="red" onClick={() =>deleteContact(contact.key)}>Delete</Button>
      </div>
      </Card.Content>
    </Card>
  )
}
