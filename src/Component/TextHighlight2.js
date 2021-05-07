import React ,{ Component } from 'react';

import LoadingButton from './buttonAnnotate'
import './Textighlight2.css';
import DataInfo from "./DataInfo";



class TextHighlight2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: `An enhanced polymerase chain reaction (PCR) assay to detect the coronavirus associated with severe acute respiratory syndrome (SARS-CoV) was developed in which a target gene pre-amplification step preceded TaqMan real-time fluorescent PCR. 
            Clinical samples were collected from 120 patients diagnosed as suspected or probable SARS cases and analyzed by conventional PCR followed by agarose gel electrophoresis, conventional TaqMan real-time PCR, and our enhanced TaqMan real-time PCR assays. 
            An amplicon of the size expected from SARS-CoV was obtained from 28/120 samples using the enhanced real-time PCR method. Conventional PCR and real-time PCR alone identified fewer SARS-CoV positive cases. Results were confirmed by viral culture in 3/28 cases. 
            The limit of detection of the enhanced real-time PCR method was 102-fold higher than the standard real-time PCR assay and 107-fold higher than conventional PCR methods. The increased sensitivity of the assay may help control the spread of the disease during future SARS outbreaks.`,
            meta:  [
                {start: 64, end :null, title : "coronavirus", content : "group of related viruses that cause diseases in mammals and birds", linkData :"https://www.wikidata.org/wiki/Q89469904"},
                {start: 127, end : 135, title : "SARS-CoV", content : "viral strain that causes severe acute respiratory syndrome (SARS)", linkData :"https://www.wikidata.org/wiki/Q85438966"},
                {start: 235, end : 238, title : "PCR", content : "In vitro method for producing large amounts of specific DNA or RNA fragments from small amounts of short oligonucleotide primers", linkData : "http://wikidata.org/entity/Q176996"},
                ],
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
export default TextHighlight2;

