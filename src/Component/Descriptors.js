import React, {useState, useEffect} from 'react';
import EntityHighlight from "./EntityHighlight";
import axios from "axios";
import {isEmptyResponse} from '../Utils';

// Get the list of KBs that we consider in the named entities and descriptors
import KB from "../config/knowledge_bases.json";

/**
 * Formats the article's global descriptors (similar to named entities but not referring to a part of the text)
 */
const Descriptors = () => {

    const [listDescriptor, setListDescriptor] = useState('');

    useEffect(() => {
        let articleUri = new URLSearchParams(window.location.search).get("uri");
        let query = process.env.REACT_APP_BACKEND_URL + "/getArticleDescriptors/?uri=" + articleUri;
        if (process.env.REACT_APP_LOG === "on") {
            console.log("Will submit backend query: " + query);
        }
        axios(query).then(response => {
            if (!isEmptyResponse(query, response)) {
                let descriptors = [];

                // Filter out the URIs that are not in one of the accepted knowledge bases
                response.data.result.forEach(entity => {
                    let inDomains = KB.some(kb =>
                        kb.used_for.find(e => e === "descriptor") !== undefined &&
                        entity.entityUri.includes(kb.namespace)
                    )
                    if (inDomains) {
                        descriptors.push(entity);
                    }
                });
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("------------------------- Retrieved " + descriptors.length + " descriptors.");
                    descriptors.forEach(e => console.log(e));
                }

                setListDescriptor(descriptors);
            }
        })
    }, []);


    /**
     * Present a descriptor of the article as a highlighted text span with pop-over
     *
     * @param id : pop-over identifier
     * @param descriptor : the data about the descriptor (uri, label associated with the uri if any)
     * @param result
     */
    function wrap(id, descriptor, result) {

        let content = [];

        // Find the knowledge base that the URI comes from to use its name as a badge
        let badge = "";
        KB.forEach(kb => {
            if (descriptor.entityUri.includes(kb.namespace)) {
                badge = kb.name;
            }
        });

        // Display the label from the KB if we have it, otherwise simply the URI
        let entityLabel = descriptor.entityLabel;
        if (entityLabel === undefined) {
            entityLabel = descriptor.entityUri;
        }

        // Format the link, label and badge
        content.push(
            // #######  Crappy fix to have link to agrovoc browser but not generalizable
            <div><a href={"https://agrovoc.fao.org/browse/agrovoc/en/page/?uri=" + descriptor.entityUri} target="_external_entity">
                <span className="badge-kb">{badge}&nbsp;</span>
                <span className="entity-label">{entityLabel}</span>
            </a></div>
        );

        result.push(
            <EntityHighlight
                id={id}
                word={entityLabel}
                title={entityLabel}
                content={content}
            />
        );
        result.push(<span>&nbsp;</span>);
    }

    // ------------------------------------------------------------------------

    let result = [];
    for (let i = 0; i < listDescriptor.length; i++) {
        wrap("word-desc-" + i, listDescriptor[i], result);
    }

    return <div>
        <div className="component">
            <div className="content_header">Descriptors:</div>
            <div> {result} </div>
        </div>
    </div>
};
export default Descriptors;
