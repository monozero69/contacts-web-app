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

export default {
    addContact
};