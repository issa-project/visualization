import React, {useState, useEffect} from 'react';
import EntityHighlight from "./EntityHighlight";
import axios from "axios";

/**
 * @Presentation
 * Ce composant affiche la liste des descripteurs en utilisant la fonction wrap
 */

const Descriptors = () => {

    const [listDescriptor, setListDescriptor] = useState('');

    useEffect(() => {
        axios(process.env.REACT_APP_BACKEND_URL + "/getArticleDescriptors/" + process.env.REACT_APP_ARTICLE_ID)
            .then(response => {
                if (process.env.REACT_APP_LOG === "on") {
                    console.log("Retrieved descriptors: " + response.data.result);
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
        result.push(
            <EntityHighlight
                id={id}
                word={title}
                title={title}
                entityLabel={descriptor.entityLabel}
                entityUri={descriptor.entityUri}
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
