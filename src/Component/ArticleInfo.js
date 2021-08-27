import React ,{ useEffect , useState} from 'react';
import './ArticleInfo.css';
import pdfDow from './pdf2.png';
import axios from 'axios';
require('dotenv').config();


/**
 * @Presentation
 * C'est le composant ArticleInfo qui nous affiche les informations de présentation d'un article :
 * titre,date, type de l'article , date de publication ...
 * @returns ce composant nous retourne le premier composant qui le composant de présentation de l'article
 *
 */

const ArticleInfo = () => {


    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [type, setPub] = useState('');
    const [authors , setAuthors] = useState('');
    const [linkPdf , setLinkPDF] = useState('');


    /**
     * @Présentation :
     * On récupère de notre backend les informations suivantes :
     * - Titre
     * - date
     * - type
     * @Adresse :
     * http://localhost:3000/getArticleMetadata/f74923b3ce82c984a7ae3e0c2754c9e33c60554f
     *
     */

    useEffect(() => {
        axios(process.env.REACT_APP_BACKEND_URL+"/getArticleMetadata/"+process.env.REACT_APP_ARTICLE_ID)
            .then(response => {
                setTitle(response.data.result[0].title);
                setDate(response.data.result[0].date);
                setPub(response.data.result[0].pub);
                setLinkPDF(response.data.result[0].linkPDF);

            })
    }, []);

    /**
     * @Présentation :
     * On récupère de notre backend les informations suivantes :
     *  - Liste des autheurs
     *
     * Ainsi le foreach nous permet de lister tout les auteurs dans une list
     * @Exemple : {"result": [ {"authors": "Li, Hui"},{"authors": "Wang, Chen"}, ... ] } --------------> [ "Li Hui" , "Wang, Chen" ]
     * @Adresse:
     * http://localhost:3000/getArticleAuthors/f74923b3ce82c984a7ae3e0c2754c9e33c60554f
     *
     */

    useEffect( () => {
        axios(process.env.REACT_APP_BACKEND_URL+"/getArticleAuthors/"+process.env.REACT_APP_ARTICLE_ID)
            .then(response => {
                let authorsST = ''.substring(0);
                let listAuthors = response.data.result;
                listAuthors.forEach(element => authorsST = authorsST + element.authors.replace(',' , '') + ", " );
                //console.log(listAuthors[2].authors);
                setAuthors(authorsST);
                //console.log("authors -----------------------> :"+ authorsST);
            })

    });





    return (
            <div className="compoTitle">
                <div className="ArticleTitle">
                    <div>
                    <p className="TitleText"> {title}
                        <span className="date">{date}</span>
                        <span className="type"> {type} </span>
                        <span className="auteurs"> {authors}</span>
                        <span className="nbPage">116 pages. </span>
                        <span className="idArticle">ISBN 978-2869-778388-9</span>
                    </p>
                    </div>
                    <div className="Divider"></div>

                    <div className="pdfDowl">
                        <a href={linkPdf}>
                            <img src={pdfDow} alt="pdf"/>
                        </a>

                        <p>
                            <span className="subPdfDowl">Version publiée - <span className="nameVersion"> Français </span></span>
                            <span className="subPdfDowl">Sous licence <span className="versionPDF">CC0 1.0</span></span>
                            <span className="subPdfDowl"> Sans restriction de droits pour le monde entier.</span>
                            <span className="subPdfDowl"> Livre OCEAN FORESCOM VFinale 2020.pdf</span>
                        </p>
                    </div>
                </div>
            </div>
        );
};

export default ArticleInfo;
