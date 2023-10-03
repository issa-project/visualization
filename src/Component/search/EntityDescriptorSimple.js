import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import {Button} from 'reactstrap';
import './SearchResult.css';
import KB from "../../config/knowledge_bases.json";

/**
 * Highlight a descriptor with link to the reference vocabulary
 */
const EntityDescriptorSimple = (props) => {
    const {
        id,
        label,
        link,
    } = props;

    // Link that will be used
    const [kbLink, setKbLink] = useState('');

    // Reformat the link in case there is a specific template for that KB
    useEffect(() => {
        let kb = KB.find(_kb => link.includes(_kb.namespace));
        if (kb !== undefined) {
            if (kb.dereferencing_template === undefined)
                setKbLink(link);
            else
                // Rewrite the link with the template given for that KB
                setKbLink(kb.dereferencing_template.replace("{uri}", encodeURIComponent(link)));
        }
    }, [link]);


    return (
        <span className="entity">
            <Button id={id} type="button" className="btn highlight-descriptor">
                <a className="descriptor-link" href={kbLink} target="_external_entity">
                    {label}
                </a>
            </Button>
        </span>
    );
}

EntityDescriptorSimple.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default EntityDescriptorSimple;
