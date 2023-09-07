import './App.css';

import {Container} from 'react-bootstrap';
import SearchForm from './Component/SearchForm';
import Footer from './Component/Footer';
import NavBar from './Component/NavBar';

function Search() {
    return (
        <Container fluid="xl">
            <NavBar/>
            <SearchForm/>
            <Footer/>
        </Container>
    );
}

export default Search;
