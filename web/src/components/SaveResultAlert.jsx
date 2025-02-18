import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

const SaveResultAlert = ({show, onClose, firstname, lastname, resultType}) => {
    return (
        <Container hidden={!show}>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <Alert 
                        show={show} 
                        onClose={onClose} 
                        dismissible
                        variant={alertType(resultType)}
                        className='mt-3'
                    >
                       { alertMessage(firstname, lastname, resultType) }
                    </Alert>
                </div>
            </div>
            
        </Container>
    );
};

function alertType(resultType) {
    return resultType === 'success' ? 'success' : 'danger';
}

function alertMessage(firstname, lastname, resultType) {
    let message;

    if(resultType === 'success') {
        if(firstname && firstname.trim() !== '') {
            message = `Saved ${firstname} ${ lastname ? lastname : ''} contact details.`;
        } else {
            message = 'Saved contact details.';
        }
    } else {
        message = 'Something went wrong, could not save contact.';
    }

    return <p className='text-center'>{message}</p>;
}

SaveResultAlert.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    resultType: PropTypes.oneOf(['success', 'fail']).isRequired,
};

export default SaveResultAlert;