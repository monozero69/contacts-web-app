import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/Navbar';

const Footer = () => {
    return (
        <NavBar fixed='bottom' bg="dark" data-bs-theme="dark">
            <Container>
                <NavBar.Text>
                    &copy; 2025 MonoZero69. All Rights Reserved.
                </NavBar.Text>
            </Container>
        </NavBar>
    );
};

export default Footer;
