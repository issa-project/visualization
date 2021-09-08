import React, {useState, useEffect} from 'react';
import EntityHighlight from "./EntityHighlight";
import axios from "axios";

// Get the list of KBs that we consider in the named entities and descriptors
import KB from "../knowledge_bases.json";


/**
 * Ce composant affiche la liste des descripteurs en utilisant la fonction wrap
 */

const Descriptors = () => {

    const [listDescriptor, setListDescriptor] = useState('');

    useEffect(() => {
        axios(process.env.REACT_APP_BACKEND_URL + "/getArticleDescriptors/" + process.env.REACT_APP_ARTICLE_ID)
            .then(response => {
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("------------------------- Retrieved " + response.data.result.length + " descriptors.");
                    response.data.result.forEach(e => console.log(e));
                }
                setListDescriptor(response.data.result);
            })
    }, []);

    /**
     * Present a descriptor ofthe article as a highlighted text span with pop-over
     *
     * @param id : pop-over identifier
     * @param descriptor : descriptor content
     * @param result
     */

    function wrap(id, descriptor, result) {
        let title = descriptor.descriptorLabel.substring(12, descriptor.descriptorLabel.length - 1);

        // Find the knowledge base that the URI comes from to use its name as a badge
        let badge = "";
        KB.forEach(kb => {
            if (descriptor.entityUri.includes(kb.namespace)) {
                badge = kb.name;
            }
        });

        // Format the link, label and badge
        let content = [];
        content.push(
            <div><a href={descriptor.entityUri} target="_external_entity">
                <span className="badge-kb">{badge}&nbsp;</span>
                <span className="entity-label">{descriptor.entityLabel}</span>
            </a></div>
        );

        result.push(
            <EntityHighlight
                id={id}
                word={title}
                title={title}
                content={content}
            />
        );
        result.push(<span>&nbsp;</span>);
    }

    let descriptor = listDescriptor;

    let result = [];
    for (let i = 0; i < descriptor.length; i++) {
        //console.log("taille ----------------_>" + descriptor.length);
        //console.log(descriptor[i]);
        wrap("word-desc-" + i, descriptor[i], result);
    }

    return <div>
        <div className="component">
            <div className="content_header">Descriptors:</div>
            <div> {result} </div>
        </div>
    </div>
};
export default Descriptors;
