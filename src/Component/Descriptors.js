import React, {useState, useEffect} from 'react';
import EntityPopup from "./EntityPopup";
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
                //console.log(response.data.result);
                setListDescriptor(response.data.result);
            })
    }, []);

    /**
     * @Presentation
     * Cette fonction nous permet de highLighter les mots et de wraper le mot en question dans une pop-up grace au composant EntityPopup
     *
     * @param id : c'est l'id de chaque pop-up
     * @param descriptor : C'est l'objet qui contient les données de chaque descripteur
     * @param result : le composant EntityPopup avec les bonnes avec les informations saisies
     */

    function wrap(id, descriptor, result) {
        let title = descriptor.nameDescriptor.substring(12, descriptor.nameDescriptor.length - 1);
        let content = descriptor.nameDescriptor.substring(12, descriptor.nameDescriptor.length - 1);
        let link = descriptor.linkDescriptor.substring(0);
        result.push(
            <EntityPopup index={id} word={title} title={title} content={content} link={link}/>
        );
        result.push(<span>          </span>);
    }

    let descriptor = listDescriptor;

    let result = [];
    for (let i = 0; i < descriptor.length; i++) {
        console.log("taille ----------------_>" + descriptor.length);
        console.log(descriptor[i]);
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
