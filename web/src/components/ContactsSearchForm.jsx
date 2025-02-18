import Form from 'react-bootstrap/Form';

const ContactsSearchForm = () => {
    return (
        <Form id="search-contacts" className='d-flex'>
            <Form.Control
                type='search'
                // placeholder='Search contacts by first name or last name or both'
                placeholder='Search contacts by last or first or both name(s)'
                className='me-2'
                aria-label='Search contacts'
                // size='lg'
                htmlSize={64}
            />
        </Form> 
    );
};

export default ContactsSearchForm;