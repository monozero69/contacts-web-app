import './App.css';
import Header from './components/Header';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import SaveResultAlert from './components/SaveResultAlert';
import ContactServive from './services/ContactServive';

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
            
            <SaveResultAlert onClose={() => setSaveResultAlert({show: false})} {...saveResultAlert}/>

            <ContactForm 
                show={showAddContactForm} 
                handleClose={() => setShowAddContactForm(false)}
                onSaveSuccess={(savedContact) => {
                    setContacts([...contacts, savedContact]);
                    setShowAddContactForm(false);
                    setSaveResultAlert({...savedContact, show: true, resultType: 'success'});
                }}
                onSaveFail={() => {
                    setShowAddContactForm(false);
                    setSaveResultAlert({show: true, resultType: 'fail'});
                }}
            />

            <Contacts contacts={contacts} loadingSavedContacts={loadingSavedContacts} />
            
            <Footer />            
        </>
    )
}

export default App
