import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {RotatingLines} from 'react-loader-spinner'
import axios from "axios";
import SuggestionEntity from "./SuggestionEntity";
import SearchEntity from "./SearchEntity";
import SearchResultsList from "./SearchResultsList";
import {isEmptyResponse} from "../../Utils";
import './SearchForm.css';

import {suggestionsMock} from './suggestions.mock';

/**
 * The search form is meant to help a user select entities from a vocabulary (e.g. Agrovoc)
 * by entering the first letters of entity labels and obtaining a list of suggestions (auto-completion).
 *
 * The whole component consists of 3 elements:
 * - a simple form with an input field and a search button
 * - a list of suggested entities to perform auto-completion based on the input field
 * - a list of entities already selected by the user, those can be removed.
 *
 * When clicking the search button, the selected entities are used to perform different semantic searches.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function SearchForm() {

    // Switch buttons to toggle Agrovoc vs. Wikidata search
    const [switchAgrovocDescr, setSwitchAgrovocDescr] = useState(true);
    const [switchWikidataNE, setSwitchWikidataNE] = useState(false);

    // Suggestions for autocompletion.
    // Each suggestion should be an object like {entityLabel: "...", entityUri: "...", entityPrefLabel: "..."}
    const [suggestions, setSuggestions] = useState([]);

    // Term typed in the input field
    const [input, setInput] = useState('');

    // Search entities already selected
    const [searchEntities, setSearchEntities] = useState([]);

    // Status of the loading spinner (search for exact match)
    const [isLoadingExactMatch, setLoadingExactMatch] = useState(false);
    // Results returned by the last search with exact match
    const [searchResultsExactMatch, setSearchResultsExactMatch] = useState([]);

    // Status of the loading spinner (search for sub-concepts)
    const [isLoadingSubConcepts, setIsLoadingSubConcepts] = useState(false);
    // Results returned by the last search including sub-concepts
    const [searchResultsSubConcept, setSearchResultsSubConcept] = useState([]);

    // Status of the loading spinner (search for related concepts)
    const [isLoadingRelated, setIsLoadingRelated] = useState(false);
    // Results returned by the last search including related concepts
    const [searchResultsRelated, setSearchResultsRelated] = useState([]);


    /**
     * Use the autocomplete service to propose suggestions based on the current input value.
     */
    useEffect(() => {
        if (input.length < process.env.REACT_APP_MIN_SIZE_FOR_AUTOCOMPLETE) {
            setSuggestions([]);
        } else {
            if (process.env.REACT_APP_USE_MOCK_AUTOCOMPLETE_SERVICE === "true") {
                // Use a mock suggestion service for tests
                const filteredSuggestions = suggestionsMock.filter(
                    (_s) => _s.entityLabel.toLowerCase().includes(input)
                );
                setSuggestions(filteredSuggestions);
            } else {

                // -----------------------------------------------
                // Build the URL to invoke the auto-completion service
                // -----------------------------------------------

                let entityTypes = [];
                if (switchAgrovocDescr)
                    entityTypes.push("agrovocdescr");
                if (switchWikidataNE)
                    entityTypes.push("wikidata");

                let query = process.env.REACT_APP_BACKEND_URL + `/autoComplete/?input=${input}`;
                if (entityTypes.length === 0)
                    console.warn("Switch buttons for autoComplete function are all turned off. At least one should on.");
                else
                    query += `&entityType=${entityTypes.join(",")}`;
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("Will submit backend query: " + query);
                }

                // -----------------------------------------------
                // Invoke the auto-completion service
                // -----------------------------------------------

                axios(query).then(response => {
                    if (response.data === undefined) {
                        // If there is no suggestion, empty the previous list of suggestions
                        setSuggestions([]);
                    } else {
                        let newSuggestions = response.data.filter(
                            // Do not suggest an entity that is already in the list of selected entities
                            _s => !searchEntities.some(_e => _e.entityLabel.toLowerCase() === _s.entityLabel.toLowerCase()
                                && _s.entityUri === _e.entityUri)
                        );
                        setSuggestions(newSuggestions);
                        if (process.env.REACT_APP_LOG === "on") {
                            console.log("------------------------- Retrieved " + newSuggestions.length + " suggestions.");
                            //newSuggestions.forEach(e => console.log(e));
                        }
                    }
                })
            }
        }
        //eslint-disable-next-line
    }, [input]);


    /**
     * Enter is like clicking on the search button
     * @param {Object} e - event
     */
    const handleInputKeyUp = (e) => {
        if (e.key === 'Escape') {
            setSuggestions([]); // Clear suggestions on Escape
        }

        // if (e.key === 'Enter' && input.trim() !== '') {
        //     setInput('');
        //     setSuggestions([]); // Clear suggestions when an item is added
        // }

        // if (e.key === 'ArrowDown' ) {
        //     // use the arrows to navigate the suggestions and enter to select one
        // }
        // if (e.key === 'ArrowUp' ) {
        //     // use the arrows to navigate the suggestions and enter to select one
        // }
    };

    /**
     * When a suggestion is selected, it is added to the selected entities and
     * the input field and suggestions list are cleared.
     * @param {number} index - index of the selected suggestion
     */
    const handleSelectSuggestion = (index) => {
        let newEntity = {
            entityLabel: suggestions[index].entityLabel,
            entityUri: suggestions[index].entityUri,
            entityPrefLabel: '(' + suggestions[index].entityPrefLabel + ')',
            entityType: suggestions[index].entityType
        };
        setSearchEntities([...searchEntities, newEntity]);
        setInput('');
        setSuggestions([]);
    };

    /**
     * Remove one entity from the selected entities
     * @param {number} index
     */
    const handleRemoveEntity = (index) => {
        if (process.env.REACT_APP_LOG === "on") {
            console.log("Removing entity: " + searchEntities[index].entityLabel);
        }
        const newEntities = [...searchEntities];
        newEntities.splice(index, 1);
        setSearchEntities(newEntities);
        if (process.env.REACT_APP_LOG === "on") {
            if (newEntities.length === 0)
                console.log("Removed all entities.");
        }
    };


    const toggleSwitchAgrovocDescr = () => {
        setSwitchAgrovocDescr(!switchAgrovocDescr);
        // If unchecked, then the other must be checked
        if (!switchWikidataNE)
            setSwitchWikidataNE(true);
    }

    const toggleSwitchWikidata = () => {
        setSwitchWikidataNE(!switchWikidataNE);
        // If unchecked, then the other must be checked
        if (!switchAgrovocDescr)
            setSwitchAgrovocDescr(true);
    }

    /**
     * Click start button action
     */
    const startSearch = () => {
        setLoadingExactMatch(true);
        setIsLoadingSubConcepts(true);
        setIsLoadingRelated(true);
    }


    /**
     * Search documents matching exactly the selected entities.
     * Triggered by the search button
     */
    useEffect(() => {
        setSearchResultsSubConcept([]);
        setSearchResultsRelated([]);
        if (isLoadingExactMatch) {
            if (searchEntities.length === 0) {
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("------------------------- No search entity was selected, not invoking search service.");
                }
                setLoadingExactMatch(false);
                setSearchResultsExactMatch([]);
            } else {
                let query = process.env.REACT_APP_BACKEND_URL + "/searchDocumentsByDescriptor/?uri=" + searchEntities.map(_s => _s.entityUri).join(',');
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("Will submit backend query: " + query);
                }
                axios(query).then(response => {
                    setLoadingExactMatch(false);
                    if (isEmptyResponse(query, response)) {
                        setSearchResultsExactMatch([]);
                    } else {
                        let _results = response.data.result;
                        if (process.env.REACT_APP_LOG === "on") {
                            console.log("------------------------- Retrieved " + _results.length + " search results.");
                            //_results.forEach(e => console.log(e));
                        }
                        setSearchResultsExactMatch(_results);
                    }
                })
            }
        }
        //eslint-disable-next-line
    }, [isLoadingExactMatch]);


    /**
     * Search for documents that match the selected concepts including their sub-concepts.
     * Started after getting the exact match results.
     */
    useEffect(() => {
        let query = process.env.REACT_APP_BACKEND_URL + "/searchDocumentsByDescriptorSubConcept/?uri=" + searchEntities.map(_s => _s.entityUri).join(',');
        if (process.env.REACT_APP_LOG === "on") {
            console.log("Will submit backend query: " + query);
        }
        axios(query).then(response => {
            setIsLoadingSubConcepts(false);
            if (isEmptyResponse(query, response)) {
                setSearchResultsSubConcept([]);
            } else {
                let _results = response.data.result;
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("------------------------- Retrieved " + _results.length + " search results.");
                    //_results.forEach(e => console.log(e));
                }

                // Filter the results to keep only those documents that were not in the first set of results (with exact match)
                let additionalResults = _results.filter((_a) =>
                    !searchResultsExactMatch.find((_r) => _r.document === _a.document)
                );
                setSearchResultsSubConcept(additionalResults);
            }
        })
        //eslint-disable-next-line
    }, [searchResultsExactMatch]);


    /**
     * Search for documents that match concepts related to the selected concepts
     * Started after getting the exact match results.
     */
    useEffect(() => {
        let query = process.env.REACT_APP_BACKEND_URL + "/searchDocumentsByDescriptorRelated/?uri=" + searchEntities.map(_s => _s.entityUri).join(',');
        if (process.env.REACT_APP_LOG === "on") {
            console.log("Will submit backend query: " + query);
        }
        axios(query).then(response => {
            setIsLoadingRelated(false);
            if (isEmptyResponse(query, response)) {
                setSearchResultsRelated([]);
            } else {
                let _results = response.data.result;
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("------------------------- Retrieved " + _results.length + " search results.");
                    //_results.forEach(e => console.log(e));
                }

                // Filter the results to keep only those documents that were not in the previous sets of results
                let additionalResults = _results.filter((_a) =>
                    !searchResultsExactMatch.find((_r) => _r.document === _a.document)
                );
                setSearchResultsRelated(additionalResults);
            }
        })
        //eslint-disable-next-line
    }, [searchResultsSubConcept]);


    return (
        <>
            <div className="component">
                <h1 className="">Search documents</h1>
                <div className="multiple-inputs-container">

                    <Card><Card.Body>
                        <Form>
                            <Row className="mx-3">
                                <Col>
                                    <Form.Switch
                                        inline
                                        id="switch-agrovoc-descr"
                                        className="search-switch"
                                        style={{color: "#7474a6"}}
                                        label="Agrovoc descriptors"
                                        checked={switchAgrovocDescr}
                                        onChange={toggleSwitchAgrovocDescr}
                                    />
                                </Col>
                                <Col>
                                    <Form.Switch
                                        inline
                                        id="switch-wikidata-ne"
                                        className="search-switch"
                                        style={{color: "#6f948c"}}
                                        label="Wikidata named entites"
                                        checked={switchWikidataNE}
                                        onChange={toggleSwitchWikidata}
                                    />
                                </Col>
                            </Row>


                            { /* Input field and search button */}
                            <Row className="mb-1">
                                <Col>
                                    <Form.Control type="text" className="input-field"
                                                  placeholder="Enter text and select a suggestion"
                                                  value={input}
                                                  onChange={(e) => setInput(e.target.value)}
                                                  onKeyUp={handleInputKeyUp}
                                                  autoFocus
                                    />
                                </Col>
                                <Col>
                                    <Button id="search-button" className="search-button" variant="secondary"
                                            disabled={isLoadingExactMatch}
                                            onClick={!isLoadingExactMatch ? () => startSearch() : null}>
                                        {isLoadingExactMatch ? 'Searching...' : 'Search'}
                                    </Button>
                                </Col>
                            </Row>

                            { /* Auto-complete: list of suggestions of entities base on the input */}
                            <ListGroup className="suggestion-list overflow-auto">
                                {suggestions.map((suggestion, index) => (
                                    <SuggestionEntity key={index} id={index}
                                                      input={input}
                                                      entityLabel={suggestion.entityLabel}
                                                      entityUri={suggestion.entityUri}
                                                      entityPrefLabel={suggestion.entityPrefLabel}
                                                      entityType={suggestion.entityType}
                                                      entityCount={suggestion.count}
                                                      handleSelect={handleSelectSuggestion}
                                    />
                                ))}
                            </ListGroup>
                        </Form>
                    </Card.Body></Card>

                    { /* List of the search entities that have already been selected */}
                    <div className="entity-list">
                        {searchEntities.map((entity, index) => (
                            <SearchEntity key={index} id={index}
                                          entityLabel={entity.entityLabel}
                                          entityUri={entity.entityUri}
                                          entityPrefLabel={entity.entityPrefLabel}
                                          entityType={entity.entityType}
                                          handleRemove={handleRemoveEntity}
                            />
                        ))}
                    </div>

                </div>
            </div>

            { /* ========================================================================================== */}

            {
                <div className="component">
                    { /* Search results and buttons to navigate the pages */}
                    <div className="content_header">Results matching only the selected descriptors</div>
                    <div className="loading-spinner">
                        <RotatingLines visible={isLoadingExactMatch} height="50" width="50"/>
                    </div>
                    <SearchResultsList searchResults={searchResultsExactMatch}/>
                </div>
            }

            {
                <div className="component">
                    { /* Search results and buttons to navigate the pages */}
                    <div className="content_header">
                        Results matching the selected descriptors or any more specific descriptors
                    </div>
                    <div className="loading-spinner">
                        <RotatingLines visible={isLoadingSubConcepts} height="50" width="50"/>
                    </div>
                    <SearchResultsList searchResults={searchResultsSubConcept}/>
                </div>
            }

            {
                <div className="component">
                    { /* Search results and buttons to navigate the pages */}
                    <div className="content_header">
                        Results matching descriptors related to those selected
                    </div>
                    <div className="loading-spinner">
                        <RotatingLines visible={isLoadingRelated} height="50" width="50"/>
                    </div>
                    <SearchResultsList searchResults={searchResultsRelated}/>
                </div>
            }

        </>
    );
}

export default SearchForm;
