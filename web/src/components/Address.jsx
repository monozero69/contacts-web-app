import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Address = () => {
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
                    />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='secondLineOfAddress' className='mb-3'>
                <Form.Label>Address line 2</Form.Label>
                <Form.Control
                    type='text'
                />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='thirdLineOfAddress' className='mb-3'>
                <Form.Label>Address line 3</Form.Label>
                <Form.Control
                    type='text'
                />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='city' className='mb-3'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='county' className='mb-3'>
                <Form.Label>County</Form.Label>
                <Form.Control
                    type='text'
                />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='postcode' className='mb-3'>
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                    type='text'
                />
            </Form.Group>
            <Form.Group hidden={!showAddress} controlId='country' className='mb-3'>
                <Form.Label>Country</Form.Label>
                <Form.Select>
                    <option>Please select country</option>
                    <option value="England">England</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Wales">Wales</option>
                    <option value="Northern Ireland">Northern Ireland</option>
                </Form.Select>
            </Form.Group>
        </>
    );
};

export default Address;