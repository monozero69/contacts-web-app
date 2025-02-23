import { REST_API_ENDPOINT, HttpStatus } from "../constants";

const addContact = async (newContact) => {
    const response = await fetch(REST_API_ENDPOINT, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
    });
    
    let savedContact = {};
    if(response.status === HttpStatus.CREATED) {
        savedContact = await response.json();
    }

    return {savedContact, ok: response.status === HttpStatus.CREATED};
};

const getAllContacts = async () => {
    const response = await fetch(REST_API_ENDPOINT, {
        method:'GET', // GET is default for fetch, but making it explict
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.status === HttpStatus.OK) {
        return await response.json();
    }

    return [];
};

const removeContact = async (contactId) => {
    const response = await fetch(REST_API_ENDPOINT.concat('/', contactId), {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.status === HttpStatus.OK;
};

const updateContact = async (existingContact) => {
    const response = await fetch(REST_API_ENDPOINT, {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(existingContact),
    });
    
    let savedContact = {};
    if(response.status === HttpStatus.OK) {
        savedContact = await response.json();
    }

    return {savedContact, ok: response.status === HttpStatus.OK};
};


export default {
    addContact,
    getAllContacts,
    removeContact,
    updateContact,
};