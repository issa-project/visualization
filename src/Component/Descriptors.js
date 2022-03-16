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
        axios(query).then(response => {
            if (!isEmptyResponse(query, response)) {
                let descriptors = [];

                // Filter out the URIs that are not in one of the accepted knowledge bases
                response.data.result.forEach(entity => {
                    let inDomains = KB.some(kb =>
                        kb.used_for.find(e => e === "descriptor") != undefined &&
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

                // Group URIs/labels by descriptor
                let processedDesc = processDescriptors(descriptors);
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("------------------------- Grouped same descriptors. Keeping " + processedDesc.length + " entities.");
                    processedDesc.forEach(e => console.log(e));
                }

                setListDescriptor(processedDesc);
            }
        })
    }, []);


    /**
     * Reformat the list of descriptors where the URIs/labels of the descriptor
     * are grouped in new fields entityUris and entityLabels.
     * @example
     * The 2 descriptors:
     * { entityUri: "http://dbpedia.org/resource/Virome",
     *   descriptorText: "descriptor 'virome'",
     *   entityLabel: "Virome"}
     * { entityUri: "http://purl.obolibrary.org/obo/EHDAA_10606",
     *   descriptorText: "descriptor 'virome'"}
     * will be grouped into:
     * { descriptorText: "descriptor 'virome'",
     *   entityUris: [ "http://dbpedia.org/resource/Virome", "http://purl.obolibrary.org/obo/EHDAA_10606" ],
     *   entityLabels: [ "Virome", "" ] }
     *
     * @param descriptors[]
     * @returns {entities[]}
     */
    function processDescriptors(descriptors) {

        //--- Turn entityUri into an array entityUris and entityLabel into an array entityLabels
        descriptors.forEach(e => {
            let uri = e.entityUri;
            e.entityUris = [uri];
            delete e.entityUri;

            e.entityLabels = [];
            if (e.entityLabel === undefined) {
                e.entityLabels.push("");
            } else {
                e.entityLabels.push(e.entityLabel);
            }
            delete e.entityLabel;
        });

        //--- Merge the URIs and labels for same descriptor
        let descriptors2 = [];
        descriptors.forEach(e => {
            // Check if e already exists in descriptors2
            let index = descriptors2.findIndex(f =>
                f.entityUri === e.entityUri);
            if (index === -1) {
                // First time: simply add it to entities2
                descriptors2.push(e);
            } else {
                // It already exists: merge the two lists of URIs and labels
                descriptors2[index].entityUris = e.entityUris.concat(descriptors2[index].entityUris);
                descriptors2[index].entityLabels = e.entityLabels.concat(descriptors2[index].entityLabels);
            }
        });
        return descriptors2;
    }


    /**
     * Present a descriptor of the article as a highlighted text span with pop-over
     *
     * @param id : pop-over identifier
     * @param descriptor : the data about the descriptor (uri, label associated with the uri if any)
     * @param result
     */
    function wrap(id, descriptor, result) {

        // The only property that gives the descriptor name is in fact its rdfs:label formatted "Descriptor: ..."
        let descriptorText = descriptor.descriptorText.substring(12, descriptor.descriptorText.length - 1);

        let content = [];
        for (let i = 0; i < descriptor.entityUris.length; i++) {

            // Find the knowledge base that the URI comes from to use its name as a badge
            let badge = "";
            KB.forEach(kb => {
                if (descriptor.entityUris[i].includes(kb.namespace)) {
                    badge = kb.name;
                }
            });

            // Display the label from the KB if we have it, otherwise simply the text of the descriptor
            let entityLabel = descriptor.entityLabels[i];
            if (entityLabel === "") {
                entityLabel = descriptorText;
            }

            // Format the link, label and badge
            content.push(
                <div><a href={descriptor.entityUris[i]} target="_external_entity">
                    <span className="badge-kb">{badge}&nbsp;</span>
                    <span className="entity-label">{entityLabel}</span>
                </a></div>
            );
        }

        result.push(
            <EntityHighlight
                id={id}
                word={descriptorText}
                title={descriptorText}
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
