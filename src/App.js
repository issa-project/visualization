import './App.css';

import {Container} from 'react-bootstrap';
import Abstract from './Component/notice/Abstract';
import Footer from './Component/Footer';
import Descriptors from './Component/notice/Descriptors';
import NavBar from './Component/NavBar';
import Metadata from "./Component/notice/Metadata";
import MapComponent from "./Component/notice/Map";

function App() {
    return (
        <Container fluid="lg">
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
