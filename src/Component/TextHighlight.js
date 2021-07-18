
import React, {useEffect, useState} from 'react';
import LoadingButton from './buttonAnnotate'
import './Textighlight2.css';
import DataInfo from "./DataInfo";
import axios from 'axios';

const TextHighlight = () => {

    /**
     *
     */

    const [resume, setResume] = useState('');
    const [namedEntities, setEntities] = useState('');


    /**
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

    /*
    An enhanced polymerase chain reaction (PCR) assay to detect the coronavirus associated with severe acute respiratory syndrome (SARS-CoV)
    was developed in which a target gene pre-amplification step preceded TaqMan real-time fluorescent PCR. Clinical samples were collected
    from 120 patients diagnosed as suspected or probable SARS cases and analyzed by conventional PCR followed by agarose gel
    electrophoresis, conventional TaqMan real-time PCR, and our enhanced TaqMan real-time PCR assays. An amplicon of the size expected
    from SARS-CoV was obtained from 28/120 samples using the enhanced real-time PCR method.
    Conventional PCR and real-time PCR alone identified fewer SARS-CoV positive cases. Results were confirmed by viral culture in 3/28 cases.
    The limit of detection of the enhanced real-time PCR method was 102-fold higher than the standard real-time PCR assay and 107-fold higher than conventional PCR methods.
    The increased sensitivity of the assay may help control the spread of the disease during future SARS outbreaks.
     */



    let result = [];
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
        <div className="compoTexts"><span className="Title">Resume</span>:{result}
            <LoadingButton/>
        </div>

    );
};

export default TextHighlight;




























/*


"An enhanced polymerase chain reaction (PCR) assay to detect the coronavirus associated with severe acute respiratory syndrome (SARS-CoV) was developed in which a target gene pre-amplification step preceded TaqMan real-time fluorescent PCR. Clinical samples were collected from 120 patients diagnosed as suspected or probable SARS cases and analyzed by conventional PCR followed by agarose gel electrophoresis, conventional TaqMan real-time PCR, and our enhanced TaqMan real-time PCR assays. An amplicon of the size expected from SARS-CoV was obtained from 28/120 samples using the enhanced real-time PCR method. Conventional PCR and real-time PCR alone identified fewer SARS-CoV positive cases. Results were confirmed by viral culture in 3/28 cases. The limit of detection of the enhanced real-time PCR method was 102-fold higher than the standard real-time PCR assay and 107-fold higher than conventional PCR methods. The increased sensitivity of the assay may help control the spread of the disease during future SARS outbreaks."

import React, {Component, useEffect, useState} from 'react';

import LoadingButton from './buttonAnnotate'
import './Textighlight2.css';
import DataInfo from "./DataInfo";
import axios from "axios";



class TextHighlight extends Component {
    constructor(props) {
        super(props);
        const [resume, setResume] = useState('');

        useEffect(() => {
            axios("http://localhost:3000/getArticleMetadata/f74923b3ce82c984a7ae3e0c2754c9e33c60554f")
                .then(response => {
                    setResume(response.data.result[0].abs)
                })
        }, []);

        useEffect(() => {
            axios("http://localhost:3000/getArticleNamedEntities/f74923b3ce82c984a7ae3e0c2754c9e33c60554f")
                .then(response => {
                    setResume(response.data.result[0].)
                })
        }, []);

        this.state = {
            text: {resume},
            meta:  [
                {start: 64, end :null, title : "coronavirus", content : "group of related viruses that cause diseases in mammals and birds", linkData :"https://www.wikidata.org/wiki/Q89469904"},
                {start: 127, end : 135, title : "SARS-CoV", content : "viral strain that causes severe acute respiratory syndrome (SARS)", linkData :"https://www.wikidata.org/wiki/Q85438966"},
                {start: 235, end : 238, title : "PCR", content : "In vitro method for producing large amounts of specific DNA or RNA fragments from small amounts of short oligonucleotide primers", linkData : "http://wikidata.org/entity/Q176996"},
            ]
        }
    }



    wrap(id, text, begin, e, result) {
        let s1 = text.substring(begin, e.start);
        let w ="".substring(0);

        if (e.end === null){
            w = text.substring(e.start, e.start + (e.title).length)
        }
        else {
            w = text.substring(e.start, e.end + 1);
        }
        let title = e.title.substring(0);
        let content = e.content.substring(0);
        result.push(<span> {s1}</span>);
        result.push (
            <DataInfo index={id} word={w} title={title} content={content}/>
        )

    }



    render (){

        let result = [];
        let begin = 0;
        for (let i = 0; i < this.state.meta.length; i++) {
            this.wrap("word-" + i, this.state.text, begin, this.state.meta[i], result);
            begin = this.state.meta[i].start + (this.state.meta[i].title).length + 1;
            console.log(begin)
        }
        let r = this.state.text.substring(begin);
        console.log(r);
        result.push(<span>{ r }</span>);

        return <div className="compoTexts"> <span className="Title">Resume</span> : {result}
            <LoadingButton/>
        </div>

    }


}
export default TextHighlight;
*/
