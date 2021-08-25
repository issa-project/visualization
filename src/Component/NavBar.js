import {Component} from "react";
import { Navbar, Nav ,Button , Form , FormControl} from "react-bootstrap";
import agrilogo from './Agritrop.png';


class NavBar extends Component {

    render() {
        return(
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">
                </Navbar.Brand>
                <img src={agrilogo} alt="logo"></img>
                <Nav className="mr-auto">
                    <Nav.Link href="#Map">Map</Nav.Link>
                    <Nav.Link href="#Authors"> Cirad Authors</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar>

        );
    }

}
export default NavBar;

