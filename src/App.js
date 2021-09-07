import './App.css';

import Abstract from './Component/Abstract';
import {Footer} from './Component/Footer';
import Descriptors from './Component/Descriptors';
import NavBar from './Component/NavBar';
import Metadata from "./Component/Metadata";
import MapComponent from "./Component/Map";


function App() {

    return (
        <div className="container">
            <NavBar/>
            <Metadata/>
            <Abstract/>
            <Descriptors/>
            <MapComponent/>
            <Footer/>
        </div>
    );
}

export default App;
