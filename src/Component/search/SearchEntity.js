import PropTypes from 'prop-types';
import './SearchForm.css';
import {getClickableEntityLink} from "../../Utils";

const SearchEntity = (props) => {
    const {
        id,
        entityLabel,
        entityUri,
        entityPrefLabel,    // optional preferred label in case entityLabel is an alternate label
        entityType,
        handleRemove
    } = props;

    let classes = "entity-box ";
    if (entityType === "Agrovoc")
        classes += "entity-box-bg1";
    else if (entityType === "Wikidata")
        classes += "entity-box-bg3";
    else classes += "entity-box-bg4";

    return (
        <div className={classes} key={id}>
            <div>
                <a className="entity-link" href={getClickableEntityLink(entityUri)} target="_external_entity">
                    {entityLabel}
                </a>
            </div>
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
    entityType: PropTypes.string.isRequired,
    handleRemove: PropTypes.func.isRequired
}

export default SearchEntity;
