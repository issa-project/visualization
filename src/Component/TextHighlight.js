
import React, {useEffect, useState} from 'react';
import LoadingButton from './buttonAnnotate'
import './Textighlight2.css';
import DataInfo from "./DataInfo";
import axios from 'axios';

const TextHighlight = () => {
    const [resume, setResume] = useState('');
    const [namedEntities, setEntities] = useState('');



    useEffect(() => {
        axios("http://localhost:3000/getArticleMetadata/f74923b3ce82c984a7ae3e0c2754c9e33c60554f")
            .then(response => {
                //console.log(response.data.result[0].abs);
                setResume(response.data.result[0].abs)

            })
    }, []);

    useEffect(() => {
        axios("http://localhost:3000/getArticleNamedEntities/f74923b3ce82c984a7ae3e0c2754c9e33c60554f")
            .then(response => {
                //console.log(response.data.result);
                setEntities(response.data.result);
            })
    }, []);


    function wrap(id, text, begin, e, result){
        let s1 = text.substring(begin, e.startPos);
        let w ="".substring(0);

        if (e.endPos === null){
            w = text.substring(e.startPos, e.startPos + (e.nameEntity).length)
        }
        else {
            w = text.substring(e.start, e.end + 1);
        }
        let title = e.nameEntity.substring(0);
        let content = e.nameEntity.substring(0);
        result.push(<span> {s1}</span>);
        result.push (
            <DataInfo index={id} word={w} title={title} content={content}/>
        )
    }



    let result = [];
    let begin = 0;

    for (let i = 0; i < namedEntities.length; i++) {
        console.log("Tail List " + namedEntities.length)
        wrap("word-" + i, resume, begin, namedEntities[i], result);
        begin = namedEntities[i].startPos + (namedEntities[i].nameEntity).length + 1;
        //console.log(begin)
    }

    let r = resume.substring(begin);
    console.log(r);

    result.push(<span>{r}</span>);



    return(
        <div className="compoTexts"><span className="Title">Resume</span> : {result}
            <LoadingButton/>
        </div>

    );
};

export default TextHighlight;




























/*

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
