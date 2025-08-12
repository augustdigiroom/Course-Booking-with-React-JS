import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" className="bg-light" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Zuitt Booking</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* ms-auto pushes the nav items to the right */}
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/courses" exact="true">Courses</Nav.Link>
                        <Nav.Link as={NavLink} to="/news" exact="true">News</Nav.Link>

                        {/* Show Add Course only for Admins */}
                        {user.isAdmin && (
                            <>
                                <Nav.Link as={NavLink} to="/addCourse" exact="true">Add Course</Nav.Link>
                                <Nav.Link as={NavLink} to="/addNews" exact="true">Add News</Nav.Link>
                            </>
                        )}

                        {user.id != null ? (
                            <>
                                <Nav.Link as={NavLink} to="/profile" exact="true">Profile</Nav.Link>
                                <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                                {/* Register only shows if not logged in */}
                                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
