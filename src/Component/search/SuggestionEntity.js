import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import './SearchForm.css';

/**
 * Suggestion of an entity based on the user input
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SuggestionEntity = (props) => {
    const {
        id,
        entityLabel,        // the label that was used by the auto-complete service
        entityUri,          // the URI of the entity/concept corresponding to the label
        entityPrefLabel,    // optional preferred label in case entityLabel is an alternate label
        handleSelect
    } = props;

    return (
        <ListGroup.Item key={id} className="suggestion-item" action variant="light"
                        onClick={() => handleSelect(id)}>
            {entityLabel} &nbsp;
            <span className={"suggestion-pref-label"}>{entityPrefLabel}</span>
        </ListGroup.Item>
    );
}

SuggestionEntity.propTypes = {
    id: PropTypes.number.isRequired,
    entityLabel: PropTypes.string.isRequired,
    entityUri: PropTypes.string.isRequired,
    entityPrefLabel: PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired
}

export default SuggestionEntity;
