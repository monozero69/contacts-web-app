import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ContactDetails from './ContactDetails';
import ContactServive from '../services/ContactServive';


const ContactForm = ({show, handleClose, onSaveSuccess, onSaveFail}) => {

    const [contactData, setContactData] = useState({});
    const [saveInProgress, setSaveInProgress] = useState(false);

    const handleChange = (formField) => {
        const {name, value} = formField.target;
        setContactData({
            ...contactData,
            [name]: value,
        });
    };

    const handleSave= (e) => {
        e.preventDefault();
        (async () => {
            setSaveInProgress(true);
            const savedContact = await ContactServive.addContact(contactData);
            setSaveInProgress(false);
            if(savedContact.id) {
                onSaveSuccess(savedContact);
            } else {
                onSaveFail(savedContact);
            }
            setContactData({});
        })();
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={!saveInProgress} size='lg' scrollable>
            <Modal.Header closeButton={!saveInProgress}>
                <Modal.Title><i className='bi bi-person-fill-add' /> Add Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Spinner hidden={!saveInProgress} animation='border' variant='success' role='status'>
                        <span className='visually-hidden'>Saving...</span>
                    </Spinner> { saveInProgress ? 'Saving contact in progress ...' : ''}
                <ContactDetails hidden={saveInProgress} handleChange={handleChange} />
            </Modal.Body>
            <Modal.Footer hidden={saveInProgress}>
                <Button variant='danger' onClick={handleClose}>
                    <i className='bi bi-x-circle'/> Cancel
                </Button>
                <Button variant='success' onClick={handleSave}>
                    <i className='bi bi-floppy-fill'/> Save
                </Button>                
            </Modal.Footer>
        </Modal>
    );
};

ContactForm.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    onSaveSuccess: PropTypes.func,
    onSaveFail: PropTypes.func,
};

export default ContactForm;