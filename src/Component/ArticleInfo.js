import React ,{ useEffect , useState} from 'react';
import './ArticleInfo.css';
import fileIcon from './images/file_icon.png';
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
    const [pub, setPub] = useState('');
    const [authors, setAuthors] = useState('');
    const [linkPdf, setLinkPDF] = useState('');
    const [url, setUrl] = useState('');
    const [license, setLicense] = useState('');
    const [lang, setLang] = useState('');


    /**
     * @Présentation :
     * @Adresse :
     * http://localhost:3000/getArticleMetadata/f74923b3ce82c984a7ae3e0c2754c9e33c60554f
     */
    useEffect(() => {
        axios(process.env.REACT_APP_BACKEND_URL+"/getArticleMetadata/"+process.env.REACT_APP_ARTICLE_ID)
            .then(response => {
                setTitle(response.data.result[0].title);
                setDate(response.data.result[0].date.substring(0, 4));
                setPub(response.data.result[0].pub);
                setLinkPDF(response.data.result[0].linkPDF);
                setUrl(response.data.result[0].url);
                setLicense(response.data.result[0].license);

                var lang = response.data.result[0].lang;
                if (lang == "eng") lang = "English"
                else if (lang == "fre") lang = "French";
                setLang(lang);
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
                listAuthors.forEach(element =>
                    authorsST = authorsST + element.authors.replace(',' , '') + ", " );
                // Remove the last ", "
                authorsST = authorsST.substring(0, authorsST.length - 2);
                //console.log(listAuthors[2].authors);
                setAuthors(authorsST);
                //console.log("authors -----------------------> :"+ authorsST);
            })

    });



    return (
            <div className="component">
                <div className="">
                    <div>
                        <h1 className="">{title} </h1>
                        <p>
                            <span className="metadata font-weight-bold"> {authors}. </span>
                            <span className="metadata">{date}. </span>
                            <span className="metadata font-italic"> {pub}. </span>
                            <span className="block"><a href={url}>{url}</a></span>
                        </p>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="">
                    <tr>
                        <td valign="middle" align="right">
                            <a href={linkPdf}>
                                <img className="doc_icon" src={fileIcon} alt="File icon"/>
                            </a>
                        </td>

                        <td valign="top" align="left">
                            <span className="block">Language: {lang}</span>
                            <span className="block">Licence: {license}</span>
                            <span className="block document_filename">{linkPdf}</span>
                            <span className="block"><a href={linkPdf}>Download</a></span>
                        </td>
                    </tr>

                </div>
            </div>
        );
};

export default ArticleInfo;
