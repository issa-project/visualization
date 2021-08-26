import React ,{ useEffect , useState} from 'react';
import './ArticleInfo.css';
import pdfDow from './pdf2.png';
import axios from 'axios';
require('dotenv').config();



/*
const data = execLibRequest(`https://covidontheweb.inria.fr/sparql`,`select *
    where {
    <http://ns.inria.fr/covid19/f74923b3ce82c984a7ae3e0c2754c9e33c60554f> dct:title ?title.
    }LIMIT 10`);

    //response.data.result[0].title
*/

const ArticleInfo = () => {


    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [type, setPub] = useState('');
    const [authors , setAuthors] = useState('');



    useEffect(() => {
        axios("http://localhost:"+process.env.REACT_APP_PORT+"/getArticleMetadata/"+process.env.REACT_APP_ARTICLE_ID)
            .then(response => {
                setTitle(response.data.result[0].title);
                setDate(response.data.result[0].date);
                setPub(response.data.result[0].pub);

            })
    }, []);


    useEffect( () => {
        axios("http://localhost:"+process.env.REACT_APP_PORT+"/getArticleAuthors/"+process.env.REACT_APP_ARTICLE_ID)
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
                        <img src={pdfDow} alt="pdf"/>
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
