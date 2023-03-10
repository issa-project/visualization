import './App.css';

import {Container} from 'reactstrap';
import Abstract from './Component/Abstract';
import Footer from './Component/Footer';
import Descriptors from './Component/Descriptors';
import NavBar from './Component/NavBar';
import Metadata from "./Component/Metadata";
import MapComponent from "./Component/Map";

function App() {
    return (
        <Container>
            <NavBar/>
            <Metadata/>
            <Abstract/>
            <Descriptors/>
            <MapComponent/>
            <Footer/>
        </Container>
    );
}

export default App;
