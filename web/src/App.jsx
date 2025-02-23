import './App.css';
import Header from './components/Header';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ActionResultAlert from './components/ActionResultAlert';
import ContactServive from './services/ContactServive';
import { ActionResultType, ContactAction, ContactFormType, EMPTY_CONTACT } from './constants';
import { removeContactFromList, updateContactInList } from './util';

function App() {
    
    const [showAddContactForm, setShowAddContactForm] = useState(false);
    const [saveResultAlert, setSaveResultAlert] = useState({show: false});
    const [contacts, setContacts] = useState([]);
    const [loadingSavedContacts, setLoadingSavedContacts] = useState(true);

    useEffect(() => {
        (async () => {
            const loadedContacts = await ContactServive.getAllContacts();
            setContacts(loadedContacts);
            setLoadingSavedContacts(false);
        })();
    }, []); // run once on App page loading

    return (
        <>
            <Header handleAddContact={() => setShowAddContactForm(true)} loadingSavedContacts={loadingSavedContacts} />
            
            <ActionResultAlert onClose={() => setSaveResultAlert({show: false})} {...saveResultAlert}/>

            <ContactForm
                contact={EMPTY_CONTACT}
                contactFormType={ContactFormType.ADD} 
                show={showAddContactForm} 
                handleClose = {() => setShowAddContactForm(false)}
                onSaveSuccess = {(savedContact) => {
                    setContacts([...contacts, savedContact]);
                    setShowAddContactForm(false);
                    setSaveResultAlert({...savedContact, show: true, resultType: ActionResultType.SUCCESS_ADD});
                }}
                onSaveFail= {() => {
                    setShowAddContactForm(false);
                    setSaveResultAlert({show: true, resultType: ActionResultType.FAIL});
                }}
            />
            <div className='contacts-wrapper'>
                <div className='contacts-content'>
                    <Contacts 
                        contacts={contacts} 
                        loadingSavedContacts={loadingSavedContacts}
                        onActionSuccess={(actionType, contact) => {
                            if(actionType === ContactAction.DELETE) {
                                setSaveResultAlert({...contact, show: true, resultType: ActionResultType.SUCCESS_DELETE});
                                setContacts(removeContactFromList([...contacts], contact));
                            } else {
                                setSaveResultAlert({...contact, show: true, resultType: ActionResultType.SUCCESS_UPDATE});
                                setContacts(updateContactInList([...contacts], contact));
                            }
                        }}
                        onActionFail={() => {
                            setSaveResultAlert({show: true, resultType: ActionResultType.FAIL});
                        }}
                    />
                </div>
            </div>
            <Footer />            
        </>
    )
}

export default App
