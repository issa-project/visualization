import './App.css';
import SearchForm from './Component/SearchForm';
import Footer from './Component/Footer';
import NavBar from './Component/NavBar';

function Search() {
    return (
        <div className="container">
            <NavBar/>
            <SearchForm/>
            <Footer/>
        </div>
    );
}

export default Search;
