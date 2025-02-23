import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Address from './Address';
import { ContactFormType } from '../constants';

const ContactDetails = ({handleChange, hidden, contact, contactFormType}) => {
    return (
        <Form hidden={hidden}>
            <Form.Group controlId='firstname' className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type='text'
                    autoFocus
                    name='firstname'
                    onChange={handleChange}
                    value={contact.firstname}
                    readOnly={contactFormType === ContactFormType.VIEW}
                />
            </Form.Group>
            <Form.Group controlId='lastname' className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type='text'
                    name='lastname'
                    onChange={handleChange}
                    value={contact.lastname}
                    readOnly={contactFormType === ContactFormType.VIEW}
                />
            </Form.Group>
            <Form.Group controlId='phone' className='mb-3'>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                    type='tel'
                    name='phonenumber'
                    onChange={handleChange}
                    value={contact.phonenumber}
                    readOnly={contactFormType === ContactFormType.VIEW}
                />
            </Form.Group>
            <Form.Group controlId='emailAddress' className='mb-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type='email'
                    name='email'
                    placeholder='name@example.com'
                    onChange={handleChange}
                    value={contact.email}
                    readOnly={contactFormType === ContactFormType.VIEW}
                />
            </Form.Group>
            <Address handleChange={handleChange} contact={contact} contactFormType={contactFormType} />
        </Form>
    );
};

ContactDetails.propTypes = {
    handleChange: PropTypes.func,
    hidden: PropTypes.bool,
    contact: PropTypes.object,
    contactFormType: PropTypes.object.isRequired,
};

export default ContactDetails;