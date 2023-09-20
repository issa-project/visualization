import './App.css';

import {Container} from 'react-bootstrap';
import SearchForm from './Component/search/SearchForm';
import Footer from './Component/Footer';
import NavBar from './Component/NavBar';

function Search() {
    return (
        <Container fluid="lg">
            <NavBar/>
            <SearchForm/>
            <Footer/>
        </Container>
    );
}

export default Search;
