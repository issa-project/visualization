import './App.css';

import TextHighlight from './Component/TextHighlight';
import { Footer }  from './Component/Footer';
import KeyWord from './Component/KeyWord';
import NavBar from './Component/NavBar';
import ArticleInfo from "./Component/ArticleInfo";
import MapComponent from "./Component/Map";


function App() {
    return (
        <div className="container">
            <NavBar/>
            <ArticleInfo/>
            <TextHighlight/>
            <KeyWord/>
            <MapComponent/>
            <Footer/>
        </div>
    );
}

export default App;
