
import React, {useEffect, useState} from 'react';
import './Textighlight2.css';
import DataInfo from "./DataInfo";
import Button from 'react-bootstrap/Button'
import './buttonAnnotate.css';
import axios from 'axios';

const TextHighlight = () => {

    /**
     *
     */

    const [resume, setResume] = useState('');
    const [namedEntities, setEntities] = useState('');
    const [isLoading, setLoading] = useState(false);
    let result = [];




    /**s
     * Call  + config (localhost + Port ) ---> .env
     */
    useEffect(() => {
        axios("http://localhost:3000/getArticleMetadata/f74923b3ce82c984a7ae3e0c2754c9e33c60554f")
            .then(response => {
                //console.log((response.data.result[0].abs).substr(9,));
                setResume((response.data.result[0].abs).substr(9,));
            })
    }, []);




    /**
     * Call  + config (localhost + Port ) ---> .env
     */
    useEffect(() => {
        axios("http://localhost:3000/getArticleNamedEntities/f74923b3ce82c984a7ae3e0c2754c9e33c60554f")
            .then(response => {
                setEntities(response.data.result.sort(compare));
            })
    }, []);




    /**
     *
     * @param list
     */

    function cleanArray(list) {
        let arrayClean = list ;
        for (let i = 0; i < arrayClean.length - 1; i++) {
            if(arrayClean[i].nameEntity === list[i+1].nameEntity.toLowerCase()){
                list.splice(i +1 ,1);
            }
            if(arrayClean[i].nameEntity === arrayClean[i].nameEntity.toUpperCase()){
                list.splice(i,1);
            }

            if(i === 2) {
                list.splice(i,1);
            }
        }

        console.log("cleanList --->"+arrayClean);
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

    function wrap(id, text, begin, e, result){
        let s1 = text.substring(begin, e.startPos);
        let w ="".substring(0);
        //console.log(e.nameEntity+" : "+ e.startPos +" : "+e.endPos);
        //-->console.log("text_s11 : "+ s1 + " begin : " +begin + " startPos : " + e.startPos);
        if (e.endPos === undefined){
            w = text.substring(e.startPos, e.startPos + (e.nameEntity).length);
            //console.log("----> word"+ w);
        }
        else {
            w = text.substring(e.startPos, e.endPos + 1);
            //console.log("----> word"+ w);
        }
        let title = e.nameEntity.substring(0);
        let content = e.nameEntity.substring(0);
        result.push(<span> {s1}</span>);
        result.push (
            <DataInfo index={id} word={w} title={title} content={content}/>
        )
    }


    /**
     *
     * @param a
     * @param b
     * @returns {number}
     */
    function compare( a, b ) {
        if ( a.startPos < b.startPos ){
        return -1;
    }
    if ( a.startPos > b.startPos ){
        return 1;
    }
    return 0;
    }

    function LoadingButton() {
        const handleClick = () => setLoading(true);
        const clickAgain =() => setLoading(false);

        return (
            <Button
                className="buttonA"
                variant="secondary"
                //disabled={isLoading}
                onClick={isLoading ? clickAgain : handleClick }
            >
                {isLoading ? 'Resume' : 'Annotate'}
            </Button>
        );

    }


    //let result = [];
    let begin = 0;
    let cleanList = cleanArray(namedEntities);
    console.log(cleanList);

    for (let i = 0; i < cleanList.length; i++) {
        wrap("word-" + i, resume, begin, cleanList[i], result);
        //-->console.log("begin : " + begin +"= cleanList[i].startPos : " +cleanList[i].startPos +" + cleanList[i].nameEntity.length + 1 : "+cleanList[i].nameEntity.length);
        begin = cleanList[i].startPos + cleanList[i].nameEntity.length + 1;
        //-->console.log(begin);
    }
    console.log(begin);
    let r = resume.substring(begin);
    //console.log(r);
    //console.log(result);

    result.push(<span>{r}</span>);



    return(
        <div className="compoTexts"><span className="Title">Resume</span>:{isLoading ? result : resume}
            <LoadingButton/>
        </div>

    );
};

export default TextHighlight;




























