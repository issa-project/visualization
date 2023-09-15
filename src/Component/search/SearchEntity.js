import React from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';

const SearchEntity = (props) => {
    const {
        id,
        entityLabel,
        entityUri,
        entityPrefLabel,    // optional preferred label in case entityLabel is an alternate label
        handleRemove
    } = props;

    return (
        <div className="entity-box" key={id}>
            <div className="entity-text">{entityLabel}</div>
            <button className="entity-remove-button" onClick={() => handleRemove(id)}>
                &times;
            </button>
        </div>
    );
}

SearchEntity.propTypes = {
    id: PropTypes.number.isRequired,
    entityLabel: PropTypes.string.isRequired,
    entityUri: PropTypes.string.isRequired,
    entityPrefLabel: PropTypes.string,
    handleRemove: PropTypes.func.isRequired
}

export default SearchEntity;
