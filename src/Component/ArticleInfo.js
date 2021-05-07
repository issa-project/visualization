import React ,{ Component } from 'react';
import './ArticleInfo.css';
import pdfDow from './pdf2.png';

class ArticleInfo extends Component {


    render () {
        return (
            <div className="compoTitle">
                <div className="Title">
                    <div>
                    <p className="TitleText">A real-time PCR for SARS-coronavirus incorporating target gene pre-amplification
                        <span className="date">2020</span>
                        <span className="type">Academic Article and research paper </span>
                        <span className="auteurs">Li Hui Wang,Chen Dillon ,Natalie Wong,Freda Pui-Fan Chan,Paul Cheung,Albert Fung </span>
                        <span className="nbPage">116 pages.</span>
                        <span className="idArticle">ISBN 978-2869-778388-9</span>
                    </p>
                    </div>

                    <div>
                        <p>
                            Version publiée - <span className="nameVersion"> Français </span>
                            Sous licence <span className="versionPDF">CC0 1.0</span>
                            Sans restriction de droits pour le monde entier.
                            <span className="namePDF"> Livre OCEAN FORESCOM VFinale 2020.pdf</span>
                        </p>
                        <img src={pdfDow} alt="pdf"/>

                    </div>

                </div>



            </div>



        );



    }
}
export default ArticleInfo;
