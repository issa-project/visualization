import React, { useState } from "react";
import {Button} from "react-bootstrap";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Call your API endpoint here with the search term and set the results
    // You can replace the below code with your own API call
    fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setResults(data));
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
    <div>
      <form>
        <label>
          Search:
          <input type="text" value={searchTerm} onChange={handleChange} />
        </label>

        <Button id="search" type="button" className="btn highlight-entity" onClick={handleSearch}>
          Search
        </Button>

      </form>
      <ul>
        {displayedResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
      <div>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default App;