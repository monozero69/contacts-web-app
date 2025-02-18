import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Address from './Address';

const ContactDetails = ({handleChange, hidden}) => {
    return (
        <Form hidden={hidden}>
            <Form.Group controlId='firstname' className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type='text'
                    autoFocus
                    name='firstname'
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId='lastname' className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type='text'
                    name='lastname'
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId='phone' className='mb-3'>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                    type='tel'
                    name='phonenumber'
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId='emailAddress' className='mb-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type='email'
                    name='email'
                    placeholder='name@example.com'
                    onChange={handleChange}
                />
            </Form.Group>
            <Address />
        </Form>
    );
};

ContactDetails.propTypes = {
    handleChange: PropTypes.func,
    hidden: PropTypes.bool,
};

export default ContactDetails;