import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import DeleteActionProgress from './DeleteActionProgress';
import { useState } from 'react';
import { ContactAction } from '../constants';
import ContactServive from '../services/ContactServive';

const TableHeadings = () => {
    return (
        <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th></th>
            </tr>
        </thead>
    );
};

const TableBody = ({contacts, onActionSuccess, onActionFail}) => {

    const [showDeleteActionProgress, setShowDeleteActionProgress] = useState(false);

    const handleAction = (actionType, contact) => {
        if(actionType === ContactAction.DELETE) {
            setShowDeleteActionProgress(true);
            (async () => {
                const result = await ContactServive.removeContact(contact.id);
                result ? onActionSuccess(actionType, contact) : onActionFail(actionType, contact);
                setShowDeleteActionProgress(false);
            })();
        }
    };

    return (
        <tbody>
            {
                contacts.map((contact => {
                    return (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.firstname}</td>
                            <td>{contact.lastname}</td>
                            <td>{contact.phonenumber}</td>
                            <td>{contact.email}</td>
                            <td className='text-center'>
                                <DropdownButton id={`dropdown-${contact.id}`} title='...' variant='outline-secondary' drop={'down-centered'} className='contact-action-dropdown' onSelect={(eventKey) => handleAction(eventKey, contact)}>
                                    <Dropdown.Item eventKey={ ContactAction.VIEW_MORE_INFO }><i className='bi bi-info-circle'/> More info</Dropdown.Item>
                                    <Dropdown.Item eventKey={ ContactAction.UPDATE }><i className='bi bi-pencil'/> Edit</Dropdown.Item>
                                    <Dropdown.Item eventKey={ ContactAction.DELETE }><i className='bi bi-trash'/> Remove</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    );
                }))
            }
            <DeleteActionProgress show={showDeleteActionProgress} />
        </tbody>
    );
};

const Contacts = ({contacts, loadingSavedContacts, onActionSuccess, onActionFail}) => {

    if(!contacts.length) {
        let alertMessage = loadingSavedContacts ? <> <Spinner variant='info'/> <br/> <span>Loading saved contacts ...</span> </>: 'No saved contacts';
        return (
            <Alert 
                show={true}
                variant='danger'
                className='mt-3 ms-3 me-3'
            >
                <h1 className='text-center'>{alertMessage}</h1>
            </Alert>
        );
    }

    return (
        <Card body className='mt-3'>
            <Table striped bordered hover>
                <TableHeadings />
                <TableBody 
                    contacts={contacts} 
                    onActionSuccess={onActionSuccess}
                    onActionFail={onActionFail}
                />                
            </Table>
        </Card>
    );
};

Contacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    loadingSavedContacts: PropTypes.bool,
    onActionSuccess: PropTypes.func,
    onActionFail: PropTypes.func,
};

TableBody.propTypes = {
    contacts: PropTypes.array.isRequired,
    onActionSuccess: PropTypes.func,
    onActionFail: PropTypes.func,
};

export default Contacts;