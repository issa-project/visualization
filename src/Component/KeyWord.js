import {Component} from "react";
import DataInfo from "./DataInfo";
import React from "react";
import "./KeyWord.css";


/**
 * @Presentation
 * Ce composant nous affiche la liste des descripteurs en utilisant la fonction wrap
 */

class KeyWord extends Component {

    /**
     * @Presentation
     * Cette fonction nous permet de highLighter les mots et de wraper le mot en question dans une pop-up grace au composant DataInfo
     *
     * @param id : c'est l'id de chaque pop-up
     * @param descriptor : C'est l'objet qui contient les données de chaque descripteur
     * @param result : le composant DataInfo avec les bonnes avec les informations saisie
     */

    wrap(id, descriptor, result){
        let title = descriptor.title.substring(0);
        let content = descriptor.content.substring(0);
            result.push (
                <DataInfo index={id} word={title} title={title} content={content}  />
                )
            result.push(<span>          </span>);
    }


    render () {
        /**
         *
         * @type {*[]}
         */

        let descriptor = [
            {title : "coronavirus", content : "group of related viruses that cause diseases in mammals and birds"},
            {title : "SARS-CoV", content : "viral strain that causes severe acute respiratory syndrome (SARS)"},
            {title : "PCR", content : "In vitro method for producing large amounts of specific DNA or RNA fragments from small amounts of short oligonucleotide primers"}
        ];


        let result = [];
        for (let i = 0; i < descriptor.length; i++) {
            this.wrap("word-desc-" + i,descriptor[i], result);
        }

        return <div>
            <div className="compoKeyWord">
                <div className="Title"> Agritrop Descriptor : </div>
                <div> {result} </div>
            </div>



        </div>
    }


}
export default KeyWord;
