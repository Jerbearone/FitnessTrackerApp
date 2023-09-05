import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainNavbar() {
    return (
    <div className='main_navbar'>
        <Navbar bg="light" data-bs-theme="light">
            <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/routines">Routines</Nav.Link>
                <Nav.Link href="/activities">Activities</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
            </Container>
        </Navbar>

    </div>)
}