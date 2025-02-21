import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { ActionResultType } from '../constants';

const ActionResultAlert = ({show, onClose, firstname, lastname, resultType = ActionResultType.FAIL}) => {
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
    return ActionResultType.isSuccess(resultType) ? 'success' : 'danger';
}

function alertMessage(firstname, lastname, resultType) {
    let message;

    switch (resultType) {
        case ActionResultType.SUCCESS_ADD:
            message = `Saved ${getFullName(firstname, lastname)} contact details.`;
            break;
        case ActionResultType.SUCCESS_DELETE:
            message = `Deleted ${getFullName(firstname, lastname)} contact details.`;
            break;
        case ActionResultType.SUCCESS_UPDATE:
            message = `Updated ${getFullName(firstname, lastname)} contact details.`;
            break;
        default:
            message = 'Oops, something went wrong.';
            break;
    }

    return <p className='text-center'>{message}</p>;
}

function getFullName(firstname, lastname) {
    if(firstname && firstname.trim() !== '') {
        return `${firstname} ${ lastname ? lastname : ''}`;
    }

    return '';
}

ActionResultAlert.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    resultType: PropTypes.oneOf([ActionResultType.SUCCESS_ADD, ActionResultType.SUCCESS_DELETE, ActionResultType.SUCCESS_UPDATE, ActionResultType.FAIL]).isRequired,
};

export default ActionResultAlert;