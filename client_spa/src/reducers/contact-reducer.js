const defaultState = {
  contacts: [],
  contact: {},
  loading: false,
  errors: {}
}



export default (state=defaultState, action={}) => {
  switch (action.type) {
    case 'FETCH_CONTACTS': {
      return {
        ...state,
        contacts: action.payload
      }
    }
    case "FETCH_CONTACTS_FULFILLED": {
      return {
        ...state,
        contacts: action.payload.data.contacts || action.payload.data // in case pagination is disabled
      }
    }

    case 'NEW_CONTACT': {
      return {
        ...state,
        contact: {name:{}}
      }
    }

    case 'SAVE_CONTACT_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'SAVE_CONTACT_FULFILLED': {
      return {
        ...state,
        contacts: [...state.contacts, action.payload.data],
        errors: {},
        loading: false
      }
    }
    case 'SAVE_CONTACT_REJECTED': {
      const data = action.payload.response.data;
      // convert feathers error formatting to match client-side error formatting
      const { "name.first":firstname, "name.last":lastname, phone, email } = data.errors;
      const errors = { global: data.message, name: { firstname,lastname }, phone, email };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }
    case 'FETCH_CONTACT_PENDING': {
      console.log('I am fetch contact pending');
      return {
        ...state,
        loading: true,
        contact:{hey:'you'}
      }
    }

    case 'FETCH_CONTACT_FULFILLED': {
      return {
        ...state,
        contact: action.payload.data.response[0],
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_CONTACT_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'UPDATE_CONTACT_FULFILLED': {
      const contact = action.payload.data;
      return {
        ...state,
        contacts: state.contacts.map(item => item.key === contact.key ? contact : item),
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_CONTACT_REJECTED': {
      const data = action.payload.response.data;
      const { "name.first":first, "name.last":last, phone, email } = data.errors;
      const errors = { global: data.message, name: { first,last }, phone, email };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }

    case 'DELETE_CONTACT_FULFILLED': {
      const contacts = action.payload.data;
      return {
        ...state,
        contacts: contacts
      }
    }

    case 'GET_CONTACT_JSON':{
      return{
        ...state
      }
    }

    default:
      return state;
  }
}
