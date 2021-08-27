
import './App.css';
import {BrowserRouter as Route} from 'react-router-dom'
import TextHighlight from './Component/TextHighlight';
import { Footer }  from './Component/Footer';
import KeyWord from './Component/KeyWord';
import NavBar from './Component/NavBar';
import ArticleInfo from "./Component/ArticleInfo";
import MapComponent from "./Component/Map";


function App() {
    return (
        <div>
            <Route
                exact
                path='/:id'>
                <NavBar/>
                <ArticleInfo/>
                <TextHighlight/>
                <KeyWord/>
                <MapComponent/>
                <Footer/>
            </Route>



        </div>


    );

}

export default App;


/*

 */

