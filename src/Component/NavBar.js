import {Component} from "react";
import { Navbar, Nav ,Button , Form , FormControl} from "react-bootstrap";
import logo_agritrop from './images/logo_agritrop_en.png';
import logo_cirad from './images/logo_cirad_en.jpg';

/**
 * Ce composant représente la navBar tout en haut de notre page web
 */
class NavBar extends Component {

    render() {
        return(
            <Navbar bg="" variant="">
                <Navbar.Brand href="#home">
                </Navbar.Brand>
                <img id="logo_cirad"  src={logo_cirad} alt="logo"></img>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <img id="logo_agritrop"  src={logo_agritrop} alt="logo"></img>
                <Nav className="mr-auto">
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
