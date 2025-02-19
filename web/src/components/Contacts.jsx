import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

const Contacts = ({contacts , loadingSavedContacts}) => {

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
            <Table striped bordered hover >
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
                                        <DropdownButton title='...' variant='outline-secondary' drop='down-centered'>
                                            <Dropdown.Item><i className='bi bi-info-circle'/> More info</Dropdown.Item>
                                            <Dropdown.Item><i className='bi bi-pencil'/> Edit</Dropdown.Item>
                                            <Dropdown.Item><i className='bi bi-trash'/> Remove</Dropdown.Item>
                                        </DropdownButton>
                                    </td>
                                </tr>
                            );
                        }))
                    }
                </tbody>
            </Table>
        </Card>
    );
};

Contacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    loadingSavedContacts: PropTypes.bool,
};

export default Contacts;