export const contactIdsEqual = (contact1, contact2) => contact1.id === contact2.id;
export const contactIdsNotEqual = (contact1, contact2) => !contactIdsEqual(contact1, contact2);

export const removeContactFromList = (contactList, contactToRemove) => 
                                                                    contactList.filter((contact) => 
                                                                        contactIdsNotEqual(contact, contactToRemove));

export const updateContactInList = (contactList, contactToUpdate) => 
                                                                contactList.map((contact) => 
                                                                    contactIdsEqual(contact, contactToUpdate) ? contactToUpdate : contact);

export const cleanContact = (contact) => {
    return Object.fromEntries(
        Object
            .entries(contact)
            .map(([key, value]) => {
                return [key, value === null ? '' :  value];
            })
    );
};