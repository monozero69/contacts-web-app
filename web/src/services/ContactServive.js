import { REST_API_ENDPOINT } from "../constants";

const addContact = async (newContact) => {
    const response = await fetch(REST_API_ENDPOINT, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
    });
    
    let savedContact = {};
    if(response.status === 201) {
        savedContact = await response.json();
    }

    return savedContact;
};

const getAllContacts = async () => {
    const response = await fetch(REST_API_ENDPOINT, {
        method:'GET', // GET is default for fetch, but making it explict
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.status === 200) {
        return await response.json();
    }

    return [];
};

export default {
    addContact,
    getAllContacts,
};