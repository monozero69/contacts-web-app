import './App.css';
import Header from './components/Header';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import { useState } from 'react';
import ContactForm from './components/ContactForm';
import SaveResultAlert from './components/SaveResultAlert';

function App() {
    
    const [showAddContactForm, setShowAddContactForm] = useState(false);
    const [saveResultAlert, setSaveResultAlert] = useState({show: false});
    const [contacts, setContacts] = useState([]);

    return (
        <>
            <Header handleAddContact={() => setShowAddContactForm(true)}/>
            
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

            <Contacts contacts={contacts} />
            
            <Footer />            
        </>
    )
}

export default App
