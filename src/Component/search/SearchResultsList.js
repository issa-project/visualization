import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import SearchResult from "./SearchResult";
import './SearchResult.css';

/**
 *  This component implements the way search results are displayed: list of individual results
 *  shown by page, and buttons to navigate the pages.
 */
const SearchResultsList = (props) => {
    const {
        searchResults,
    } = props;

    // Part of the results that is currently displayed (corresponding to the page number)
    const [resultsDisplayed, setResultsDisplayed] = useState([]);

    // Page of results that is currently displayed
    const [resultPage, setResultPage] = useState(1);

    // Number of pages of results
    const [resultPageCount, setResultPageCount] = useState(0);


    /**
     * Update the results currently displayed when a new search is performed
     */
    useEffect(() => {
        if (searchResults.length === 0) {
            setResultsDisplayed([]);
            setResultPageCount(0);
        } else {
            // Update the count of pages
            let count = Math.ceil(searchResults.length / process.env.REACT_APP_RESULT_PAGE_SIZE);
            setResultPageCount(count);

            // Display the first page
            setResultPage(1);
        }
        //eslint-disable-next-line
    }, [searchResults]);


    /**
     * Update the results currently displayed when a page button is clicked
     */
    useEffect(() => {
        // Set the slice of results that are currently being shown
        const results = searchResults.slice(
            (resultPage - 1) * process.env.REACT_APP_RESULT_PAGE_SIZE,
            resultPage * process.env.REACT_APP_RESULT_PAGE_SIZE
        );
        setResultsDisplayed(results);
        //eslint-disable-next-line
    }, [resultPage, searchResults]);


    return (
        <div>
            { /* Buttons to navigate through the result pages */}
            <div className="navigation-buttons">
                <span className="">{searchResults.length} result(s).</span> &nbsp;

                <ButtonGroup>
                    {Array.from({length: resultPageCount}, (_, index) => index + 1).map(
                        (page, index) => (
                            <ToggleButton key={index} className="navigation-button" variant="outline-secondary"
                                          type="radio"
                                          checked={page === resultPage}
                                          value={page}
                                          onClick={() => setResultPage(page)}>
                                {page}
                            </ToggleButton>
                        ))}
                </ButtonGroup>
            </div>

            { /* Show the current page of search results */}
            <div>
                <div className="divider-light"/>

                {resultsDisplayed.map((_result, index) => (
                    <SearchResult key={index}
                                  document={_result.document}
                                  title={_result.title}
                                  authors={_result.authors}
                                  date={_result.date}
                                  publisher={_result.publisher}
                                  linkPDF={_result.linkPDF}
                                  matchedEntities={_result.matchedEntities !== undefined ? _result.matchedEntities : []}
                    />
                ))}
            </div>
        </div>
    );
};

SearchResultsList.propTypes = {
    searchResults: PropTypes.array.isRequired,
}

export default SearchResultsList;
