import React, {useState} from "react";
import {Button, Form, Row, Col} from "react-bootstrap";
import {ToggleButtonGroup, ToggleButton} from "react-bootstrap";

const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Call your API endpoint here with the search term and set the results
    const handleSearch = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`)
            .then((response) => {
                    return response.json();
            })
            .then((data) => setResults(data));
    };

    const handleChange = (event) => {
        console.log("Event : " + event.target.value);
        setSearchTerm(event.target.value)
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const pageSize = 10;
    const pageCount = Math.ceil(results.length / pageSize);

    const displayedResults = results.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="component">

            <Form>
                <Row className="mb-3">
                    <Col sm={8}>
                        <Form.Control
                            size="sm" type="text" placeholder="Search keywords" value={searchTerm}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                    </Col>
                    <Col sm={2}>
                        <Button id="search" size="sm" variant="secondary" type="button"
                                onClick={handleSearch}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>

            <ul>
                {displayedResults.map((result) => (
                    <li key={result.id}>{result.title}</li>
                ))}
            </ul>

            <div>
                <ToggleButtonGroup size="sm" type="radio" name="pages" defaultValue={1}>
                    {Array.from({length: pageCount}, (_, index) => index + 1).map(
                        (page) => (
                            <ToggleButton key={page} variant="light" type="button" value={page} onClick={() => handlePageChange(page)}>
                                {page}
                            </ToggleButton>
                        )
                    )}
                </ToggleButtonGroup>
            </div>

        </div>
    );
}

export default SearchForm;