import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { ContactFormType } from '../constants';

const Address = ({contact, handleChange, contactFormType}) => {
    const [showAddress, setShowAddress] = useState(false);
    return (
        <>
            <Button 
                variant='outline-secondary' 
                size='sm'
                className='mb-3'
                onClick={ () => setShowAddress(!showAddress) }
            >
                <i className='bi bi-house-add'/> {showAddress ? 'Hide' : 'Show'} Address
            </Button>
            <Form.Group hidden={!showAddress} controlId='firstLineOfAddress' className='mb-3'>
                <Form.Label>Address line 1</Form.Label>
                    <Form.Control
                        type='text'
                        name='firstLineOfAddress'
                        onChange={handleChange}
                        value={contact.firstLineOfAddress}
                        readOnly={contactFormType === ContactFormType.VIEW}
                    />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='secondLineOfAddress' className='mb-3'>
                <Form.Label>Address line 2</Form.Label>
                <Form.Control
                    type='text'
                    name='secondLineOfAddress'
                    onChange={handleChange}
                    value={contact.secondLineOfAddress}
                    readOnly={contactFormType === ContactFormType.VIEW}
                />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='thirdLineOfAddress' className='mb-3'>
                <Form.Label>Address line 3</Form.Label>
                <Form.Control
                    type='text'
                    name='thirdLineOfAddress'
                    onChange={handleChange}
                    value={contact.thirdLineOfAddress}
                    readOnly={contactFormType === ContactFormType.VIEW}
                />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='city' className='mb-3'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    name='city'
                    onChange={handleChange}
                    value={contact.city}
                    readOnly={contactFormType === ContactFormType.VIEW}
                />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='county' className='mb-3'>
                <Form.Label>County</Form.Label>
                <Form.Control
                    type='text'
                    name='county'
                    onChange={handleChange}
                    value={contact.county}
                    readOnly={contactFormType === ContactFormType.VIEW}
                />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='postcode' className='mb-3'>
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                    type='text'
                    name='postcode'
                    onChange={handleChange}
                    value={contact.postcode}
                    readOnly={contactFormType === ContactFormType.VIEW}
                />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='country' className='mb-3'>
                <Form.Label>Country</Form.Label>
                <Form.Select name='country' value={contact.country} onChange={handleChange} disabled={contactFormType === ContactFormType.VIEW}>
                    <option value=''>Please select country</option>
                    <option value="England">England</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Wales">Wales</option>
                    <option value="Northern Ireland">Northern Ireland</option>
                </Form.Select>
            </Form.Group>
        </>
    );
};

Address.propTypes = {
    contact: PropTypes.object,
    handleChange: PropTypes.func,
    contactFormType: PropTypes.object,
};

export default Address;