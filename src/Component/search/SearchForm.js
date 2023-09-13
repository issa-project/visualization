import React, {useState, useEffect} from 'react';
import {Button, Form, Row, Col} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import {isEmptyResponse} from "../../Utils";
import {suggestionsMock} from './suggestions.mock';
import './SearchForm.css';


function SearchForm() {
    // Terms types in the input
    const [input, setInput] = useState('');

    // Entities previously selected
    const [entities, setEntities] = useState([]);

    // Suggestions for autocompletion
    const [suggestions, setSuggestions] = useState([]);

    /**
     * Autocomplete suggestions from the current input value.
     * Each suggestion ends up as an array element [label, iri] and is added to state variable 'suggestions'.
     */
    useEffect(() => {

        if (input.length < process.env.REACT_APP_MIN_SIZE_FOR_AUTOCOMPLETE) {
            setSuggestions([]);
        } else {
            // Use a mock search service for tests
            if (process.env.REACT_APP_USE_MOCK_SEARCH_SERVICE === "true") {
                const filteredSuggestions = suggestionsMock.filter((_s) =>
                    _s.entityLabel.toLowerCase().includes(input)).map((_s) =>
                    [_s.entityLabel, _s.entityUri]
                );
                setSuggestions(filteredSuggestions);

            } else {
                // Invoke the auto-completion service
                let query = process.env.REACT_APP_BACKEND_URL + "/autoCompleteAgrovoc/?input=" + input;
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("input: " + input);
                    console.log("Will submit backend query: " + query);
                }
                axios(query).then(response => {
                    if (isEmptyResponse(query, response)) {
                        // Empty the previous list of suggestions if empty response
                        setSuggestions([]);
                    } else {
                        let newSuggestions = response.data.result.map(
                            (_suggestion) => [_suggestion.entityLabel.toLowerCase(), _suggestion.entityUri]
                        ).filter(
                            // Do not suggest an entities that is already selected
                            (_suggestion) => !entities.includes(_suggestion)
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
        const currentInput = e.target.value.toLowerCase();
        setInput(currentInput);
    };

    /**
     * When enter is pressed, add the selected suggestion to the list of entities
     */
    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            if (suggestions.includes(input)) {      // Add the input only when it matches a suggestion
                setEntities([...entities, input]);
                setInput('');
                setSuggestions([]); // Clear suggestions when an item is added
            }
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        setEntities([...entities, suggestion]);
        setInput('');
        setSuggestions([]);
    };

    const handleRemoveEntity = (index) => {
        const newEntities = [...entities];
        newEntities.splice(index, 1);
        setEntities(newEntities);
    };

    return (
        <div className="component">
            <div className="multiple-inputs-container">

                <div className="entity-list">
                    {entities.map((entity, index) => (
                        <div className="entity-box" key={index}>
                            <div className="entity-text">{entity[0]}</div>
                            <button className="entity-remove-button" onClick={() => handleRemoveEntity(index)}>
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

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

                    <ListGroup className="suggestion-list">
                        {suggestions.map((suggestion, index) => (
                            <ListGroup.Item key={index} className="suggestion-item" action variant="light"
                                            onClick={() => handleSelectSuggestion(suggestion)}>
                                {suggestion[0]}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                </Form>
            </div>
        </div>
    );
}

export default SearchForm;
