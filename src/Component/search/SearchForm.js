import React, {useState, useEffect} from 'react';
import {Button, Form, Row, Col} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import './SearchForm.css';
import SuggestionEntity from "./SuggestionEntity";

import {suggestionsMock} from './suggestions.mock';
import SearchEntity from "./SearchEntity";

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
    // Term typed in the input field
    const [input, setInput] = useState('');

    // Entities previously selected
    const [entities, setEntities] = useState([]);

     // Suggestions for autocompletion.
     // Each suggestion should be an object like {entityLabel: "...", entityUri: "...", entityPrefLabel: "..."}
    const [suggestions, setSuggestions] = useState([]);

    /**
     * Use the autocomplete service to propose suggestions based on the current input value.
     */
    useEffect(() => {

        if (input.length < process.env.REACT_APP_MIN_SIZE_FOR_AUTOCOMPLETE) {
            setSuggestions([]);
        } else {
            if (process.env.REACT_APP_USE_MOCK_SEARCH_SERVICE === "true") {

                // -----------------------------------------------
                // Use a mock suggestion service for tests
                // -----------------------------------------------
                const filteredSuggestions = suggestionsMock.filter(
                    (_s) => _s.entityLabel.toLowerCase().includes(input)
                );
                setSuggestions(filteredSuggestions);
            } else {

                // -----------------------------------------------
                // Invoke the auto-completion service
                // -----------------------------------------------

                let query = process.env.REACT_APP_BACKEND_URL + "/autoCompleteAgrovoc/?input=" + input;
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("Will submit backend query: " + query);
                }
                axios(query).then(response => {
                    if (response.data === undefined) {
                        // If there is no suggestion, empty the previous list of suggestions
                        setSuggestions([]);
                    } else {
                        let newSuggestions = response.data.filter(
                            // Do not suggest an entity that is already in the list of selected entities
                            _s => !entities.some(_e => _e.entityLabel.toLowerCase() === _s.entityLabel.toLowerCase()
                                && _s[1] === _e.entityUri)
                        );
                        setSuggestions(newSuggestions);
                        if (process.env.REACT_APP_LOG === "on") {
                            console.log("------------------------- Retrieved " + newSuggestions.length + " suggestions.");
                            newSuggestions.forEach(e => console.log(e));
                        }
                    }
                })
            }
        }
        //eslint-disable-next-line
    }, [input]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    /**
     * Enter is like clicking on the search button
     * @param {Object} e - event
     */
    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            // @TODO
            setInput('');
            setSuggestions([]); // Clear suggestions when an item is added
        }
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
            entityPrefLabel:'(' + suggestions[index].entityPrefLabel + ')'
        };
        setEntities([...entities, newEntity]);
        setInput('');
        setSuggestions([]);
    };

    /**
     * Remove one entity from the selected entities
     * @param {number} index
     */
    const handleRemoveEntity = (index) => {
        if (process.env.REACT_APP_LOG === "on") {
            console.log("Removing entity: " + entities[index].entityLabel);
        }
        const newEntities = [...entities];
        newEntities.splice(index, 1);
        setEntities(newEntities);
        if (process.env.REACT_APP_LOG === "on") {
            if (newEntities.length === 0)
            console.log("Removed all entities.");
        }
    };

    return (
        <div className="component">
            <div className="multiple-inputs-container">

                { /* List of the entities that have already been selected */}
                <div className="entity-list">
                    {entities.map((entity, index) => (
                        <SearchEntity
                            id={index}
                            entityLabel={entity.entityLabel}
                            entityUri={entity.entityUri}
                            entityPrefLabel={entity.entityPrefLabel}
                            handleRemove={handleRemoveEntity}
                        />
                    ))}
                </div>

                { /* Input field and search button */}
                <Form>
                    <Row className="mb-1">
                        <Col sm={8}>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Enter text and select option"
                                value={input}
                                onChange={handleInputChange}
                                onKeyUp={handleInputKeyPress}
                            />
                        </Col>
                        <Col sm={2}>
                            <Button id="search" className="search-button" size="sm" variant="secondary" type="button"
                                    onClick="">
                                Search
                            </Button>
                        </Col>
                    </Row>

                    { /* Auto-complete: list of suggestions of entities base on the input */}
                    <ListGroup className="suggestion-list overflow-auto">
                        {suggestions.map((suggestion, index) => (
                            <SuggestionEntity
                                id={index}
                                entityLabel={suggestion.entityLabel}
                                entityUri={suggestion.entityUri}
                                entityPrefLabel={suggestion.entityPrefLabel}
                                handleSelect={handleSelectSuggestion}
                            />
                        ))}
                    </ListGroup>

                </Form>
            </div>
        </div>
    );
}

export default SearchForm;
