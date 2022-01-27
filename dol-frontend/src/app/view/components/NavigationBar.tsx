import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {FormControl, Nav} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface INavigationBarProps {
    searchInput: string;
    setSearchInput: (searchInput: string) => void;
    fetchHomePageData: (searchInput: string) => void;
}

function NavigationBar(props: INavigationBarProps) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                <img
                    src={`${process.env.PUBLIC_URL}/logo.jpg`}
                    width="30"
                    height="30"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#page1">Page1</Nav.Link>
                    <NavDropdown title="Page2" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#page2.1">Page2.1</NavDropdown.Item>
                        <NavDropdown.Item href="#page2.2">Page2.2</NavDropdown.Item>
                        <NavDropdown.Item href="#page2.3">Page2.3</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#page2.x">Page2.x</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text"
                                 value={props.searchInput}
                                 onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                     props.setSearchInput(e.currentTarget.value);
                                 }}
                                 placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-success" onClick={() => {
                        props.fetchHomePageData(props.searchInput)
                    }}>Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar
