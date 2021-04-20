import React ,{ Component } from 'react';
//import DataInfo from './DataInfo'
//import LoadingButton from './buttonAnnotate'
import './Textighlight2.css';
import DataInfo from "./DataInfo";



class TextHighlight2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: `Abstract An enhanced polymerase chain reaction PCR assay to detect the coronavirus associated with severe acute respiratory syndrome (SARS-CoV) was developed in which a target gene pre-amplification step preceded TaqMan real-time fluorescent PCR.
                Clinical samples were collected from 120 patients diagnosed as suspected or probable SARS cases and analyzed by conventional PCR followed by agarose gel electrophoresis, conventional TaqMan real-time PCR, and our enhanced TaqMan real-time PCR assays.
                An amplicon of the size expected from SARS-CoV was obtained from 28/120 samples using the enhanced real-time PCR method.
                Conventional PCR and real-time PCR alone identified fewer SARS-CoV positive cases. Results were confirmed by viral culture in 3/28 cases. The limit of detection of the enhanced real-time PCR method was 102-fold higher than the standard real-time PCR assay and 107-fold higher than conventional PCR methods.
                The increased sensitivity of the assay may help control the spread of the disease during future SARS outbreaks.`,
            meta:  [ {start: 27, end : 40, title : "titre 1", content : "conteent 1"}, {start: 100, end : 110, title : "titre 2", content : "conteent 2"},
                {start: 127, end : 140, title : "titre 3", content : "conteent 3"}]

        }
    }



    wrap(id, text, begin, e, result) {
        let s1 = text.substring(begin, e.start);
        let w = text.substring(e.start, e.end + 1);
        let title = e.title.substring(0);
        let content = e.content.substring(0);
        result.push(<span>{s1}</span>);
        result.push (
            <DataInfo index={id} word={w} title={title} content={content}  />
        )

    }



    render (){

        let result = [];
        let begin = 0;
        for (let i = 0; i < this.state.meta.length; i++) {
            this.wrap("word-" + i, this.state.text, begin, this.state.meta[i], result);
            begin = this.state.meta[i].end + 1;
        }
        let r = this.state.text.substring(begin);
        result.push(<span>{ r }</span>)
        return <div className="compoTexts"> {result} </div>
    }


}
export default TextHighlight2;

