import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
const TopNavbar = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Online Clothes</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="home">Home</Nav.Link>
                        <Nav.Link as={Link} to="about">About</Nav.Link>
                        <Nav.Link as={Link} to="menswear">Eyeglasses</Nav.Link>
                        <Nav.Link as={Link} to="womenswear">Screen Glasses</Nav.Link>
                        <Nav.Link as={Link} to="kidswear">Kids Glasses</Nav.Link>
                        <Nav.Link as={Link} to="kidswear">Contact Lenses</Nav.Link>
                        <Nav.Link as={Link} to="kidswear">Sunglasses </Nav.Link>
                        <Nav.Link as={Link} to="search">Search</Nav.Link>
                        <Nav.Link as={Link} to="mycart">My Cart</Nav.Link>
                        <Nav.Link as={Link} to="contact">Cntact us</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default TopNavbar;