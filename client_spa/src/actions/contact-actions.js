import { client } from './';

const url = 'api/v1/contacts';

export function fetchContacts(){
  return dispatch => {
    dispatch({
      type: 'FETCH_CONTACTS',
      payload: client.get(url)
    })
  }
}

export function newContact() {
  return dispatch => {
    dispatch({
      type: 'NEW_CONTACT'
    })
  }
}

export function saveContact(contact) {
  console.log(contact);
  return dispatch => {
    return dispatch({
      type: 'SAVE_CONTACT',
      payload: client.post(url, contact)
    })
  }
}

export function fetchContact(id) {
  return dispatch => {
    return dispatch({
      type: 'FETCH_CONTACT',
      payload: client.get(`${url}/${id}`)
    })
  }
}

export function updateContact(contact) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_CONTACT',
      payload: client.put(`${url}/${contact.key}`, contact)
    })
  }
}

export function deleteContact(id) {
  console.log(`${url}/softdelete/${id}`);
  return dispatch => {
    return dispatch({
      type: 'DELETE_CONTACT',
      payload: client.put(`${url}/softdelete/${id}`)
    })
  }
}

export function getContactList() {
  console.log('csv clicked')
  return dispatch => {
    return dispatch({
      type: 'GET_CONTACT_JSON',
      payload: client.get(`${url}/csv`)
    })
  }
}
