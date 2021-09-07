import React, {useEffect, useState} from 'react';
import EntityHighlight from "./EntityHighlight";
import Button from 'react-bootstrap/Button'
import axios from 'axios';

/**
 * @Presentation
 * Display abstract with annotated named entities
 *
 * @return
 * component to be printed out
 */
const Abstract = () => {

    const [articleAbstract, setArticleAbstract] = useState('');
    const [namedEntities, setEntities] = useState('');
    const [isLoading, setLoading] = useState(false);
    let result = [];


    /**
     * @Presentation
     * On récupère du back-end le résumé de l'article en question.
     * Après avoir récupéré le résumé on enlève les 9 premiers Char.
     *
     * @Example : "Abstract An enhanced polymerase chain reaction (PCR) assay to detect the coronavirus associated with se ..."
     * ---> "An enhanced polymerase chain reaction (PCR) assay to detect the coronavirus associated with se ..."
     *
     * @Adresse: http://localhost:3000/getArticleMetadata/f74923b3ce82c984a7ae3e0c2754c9e33c60554f
     */
    useEffect(() => {
        axios(process.env.REACT_APP_BACKEND_URL + "/getArticleMetadata/" + process.env.REACT_APP_ARTICLE_ID)
            .then(response => {
                let abstract = response.data.result[0].abs.substr(9,);
                console.log("Retrieved abstract: " + abstract);
                setArticleAbstract(abstract);
            })
    }, []);


    /**
     * @Presentation :
     * On récupère du back-end la liste des entités nommées et on la trie
     *
     * @Exemple : "result": {"entityText": "AMPLIFICATION","startPos": 187,"endPos": 199} ,{"entityText": "CONFIRMED BY","startPos": 723,"endPos": 734} ... }
     *
     * @Adresse : http://localhost:3000/getArticleNamedEntities/f74923b3ce82c984a7ae3e0c2754c9e33c60554f
     */
    useEffect(() => {
        axios(process.env.REACT_APP_BACKEND_URL + "/getAbstractNamedEntities/" + process.env.REACT_APP_ARTICLE_ID)
            .then(response => {
                // Keep only the NEs whithin the list of accepted domains
                var domains = process.env.REACT_APP_ENTITY_DOMAINS.split("|");
                var entities = [];
                response.data.result.forEach(entity => {
                    var inDomains = false;
                    domains.forEach(domain => {
                        if (entity.entityUri.includes(domain)) {
                            inDomains = true;
                        }
                    })
                    if (inDomains) {
                        entities.push(entity);
                    }
                });

                let sortedList = entities.sort(sortByStartPos);
                console.log("Retrieved " + sortedList.length + " entities.");
                console.log("Sorted list of entities: ");
                for (let i = 0; i < sortedList.length - 1; i++) {
                    console.log(sortedList[i]);
                }
                setEntities(sortedList);
            })
    }, []);


    /**
     *
     * @param list
     */
    function cleanArray(list) {
        var arrayClean = list;
        for (let i = 0; i < arrayClean.length - 1; i++) {
            if (arrayClean[i].entityText === list[i + 1].entityText.toLowerCase()) {
                list.splice(i + 1, 1);
            }
            if (arrayClean[i].entityText === list[i].entityText.toUpperCase()) {
                list.splice(i, 1);
            }
            if (i === 2) {
                list.splice(i, 1);
            }
        }
        //console.log("cleanList --->" + arrayClean);
        return arrayClean;
    }

    /**
     *
     * @param id
     * @param text
     * @param begin
     * @param e
     * @param result
     */
    function wrap(id, text, begin, e, result) {
        let s1 = text.substring(begin, e.startPos);
        let w = "".substring(0);
        //console.log(e.entityText+" : "+ e.startPos +" : "+e.endPos);
        //console.log("text_s11 : "+ s1 + " begin : " +begin + " startPos : " + e.startPos);
        if (e.endPos === undefined) {
            w = text.substring(e.startPos, e.startPos + e.entityText.length);
            //console.log("----> word" + (e.entityText).length);
        } else {
            w = text.substring(e.startPos, e.endPos + 1);
            //console.log("----> word"+ w);
        }
        let title = e.entityText;
        let content = e.entityLabel;
        let entityUri = e.entityUri;
        result.push(<span> {s1}</span>);
        result.push(
            <EntityHighlight index={id} word={w} title={title} content={content} entityUri={entityUri}/>
        )
    }


    /**
     *
     * @param a
     * @param b
     * @returns {number}
     */
    function sortByStartPos(a, b) {
        if (a.startPos < b.startPos) {
            return -1;
        }
        if (a.startPos > b.startPos) {
            return 1;
        }
        return 0;
    }

    function LoadingButton() {
        const handleClick = () => setLoading(true);
        const clickAgain = () => setLoading(false);

        return (
            <Button
                className="annotate-button"
                variant="secondary"
                //disabled={isLoading}
                onClick={isLoading ? clickAgain : handleClick}
            >
                {isLoading ? 'Resume' : 'Annotate'}
            </Button>
        );
    }

    let begin = 0;
    let cleanList = cleanArray(namedEntities);
    //console.log("List of entities: " + cleanList);

    for (let i = 0; i < cleanList.length; i++) {
        wrap("word-" + i, articleAbstract, begin, cleanList[i], result);
        //console.log("begin : " + begin +"= cleanList[i].startPos : " +cleanList[i].startPos +" + cleanList[i].entityText.length + 1 : "+cleanList[i].entityText.length);
        begin = cleanList[i].startPos + cleanList[i].entityText.length + 1;
        //console.log(begin);
    }
    //console.log(begin);
    let r = articleAbstract.substring(begin);
    //console.log(r);
    //console.log(result);

    result.push(<span>{r}</span>);

    return (
        <div className="component"><span
            className="content_header">Abstract</span>: {isLoading ? result : articleAbstract}
            <LoadingButton/>
        </div>
    );
};

export default Abstract;
