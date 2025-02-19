import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ContactsSearchForm from './ContactsSearchForm';
import PropTypes from 'prop-types';

const Header = ({handleAddContact, loadingSavedContacts}) => {
    return (
        <NavBar bg="dark" data-bs-theme="dark">
            <Container>
                <NavBar.Brand><i className='bi bi-person-lines-fill'/> ContactsApp</NavBar.Brand>
                {
                    loadingSavedContacts ? 
                        null : (
                                    <>
                                        <ContactsSearchForm />
                                        <Button variant='primary' onClick={handleAddContact} hidden={loadingSavedContacts}>
                                            <i className='bi bi-person-fill-add'></i> Add Contact
                                        </Button>
                                    </>
                                )
                }
                
            </Container>
        </NavBar>
    );
};

Header.propTypes = {
    handleAddContact: PropTypes.func.isRequired,
    loadingSavedContacts: PropTypes.bool,
};

export default Header;