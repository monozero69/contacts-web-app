import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ContactDetails from './ContactDetails';
import ContactServive from '../services/ContactServive';
import { ContactFormType, EMPTY_CONTACT } from '../constants';


const ContactForm = ({show, handleClose, onSaveSuccess, onSaveFail, contact = EMPTY_CONTACT, contactFormType}) => {

    const [contactData, setContactData] = useState(contact);
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
            setContactData(EMPTY_CONTACT);
        })();
    };

    const onClose = () => {
        setContactData(EMPTY_CONTACT);
        handleClose();
    };

    return (
        <Modal show={show} onHide={onClose} backdrop="static" keyboard={!saveInProgress} size='lg' scrollable>
            <Modal.Header closeButton={!saveInProgress}>
                <Modal.Title><i className={contactFormType.iconClass} /> {contactFormType.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Spinner hidden={!saveInProgress} animation='border' variant='success' role='status'>
                        <span className='visually-hidden'>Saving...</span>
                    </Spinner> { saveInProgress ? 'Saving contact in progress ...' : ''}
                <ContactDetails hidden={saveInProgress} handleChange={handleChange} contact={contactData} contactFormType={contactFormType}/>
            </Modal.Body>
            <Modal.Footer hidden={saveInProgress} data-testid='contact-form-main-btns'>
                <Button variant='danger' onClick={onClose}>
                    <i className='bi bi-x-circle'/> {contactFormType === ContactFormType.VIEW ? 'Close' : 'Cancel'}
                </Button>
                <Button variant='success' onClick={handleSave} hidden={contactFormType === ContactFormType.VIEW} >
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
    contact: PropTypes.object,
    contactFormType: PropTypes.object.isRequired,
};

export default ContactForm;