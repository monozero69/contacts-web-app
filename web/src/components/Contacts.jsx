import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const Contacts = ({contacts}) => {

    if(!contacts.length) {
        return (
            <Alert 
                show={true}
                variant='danger'
                className='mt-3 ms-3 me-3'
            >
                <h1 className='text-center'>No saved contacts</h1>
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
                                    <td></td>
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
};

export default Contacts;