import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';


const DeleteActionProgress = ({show = true}) => {
    return(
        <>
            <Modal show={show} backdrop="static" keyboard='false' centered>
                <Modal.Body>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <Spinner animation='border' variant='success' role='status'>
                            <span className='visually-hidden'>Deleting contact ...</span>
                        </Spinner>
                        <p>Delete in progress ...</p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

DeleteActionProgress.propTypes = {
    show: PropTypes.bool,
};

export default DeleteActionProgress;