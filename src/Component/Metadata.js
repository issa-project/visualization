import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import './Metadata.css';
import fileIcon from './images/file_icon.png';
import axios from 'axios';
import {isEmptyResponse} from '../Utils';


/**
 * Component to display article metadata: title, authors, date, license, etc.
 */
const Metadata = () => {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [pub, setPub] = useState('');
    const [authors, setAuthors] = useState('');
    const [linkPdf, setLinkPDF] = useState('');
    const [url, setUrl] = useState('');
    const [license, setLicense] = useState('');
    const [lang, setLang] = useState('');
    const [langUri, setLangUri] = useState('');
    const articleUri = new URLSearchParams(useLocation().search).get("uri");


    /**
     * Get the article's metadata
     */
    useEffect(() => {
        console.log(("articleUri: " + articleUri));
        let query = process.env.REACT_APP_BACKEND_URL + "/getArticleMetadata/?uri=" + articleUri;
        if (process.env.REACT_APP_LOG === "on") {
            console.log("Will submit backend query: " + query);
        }
        axios(query).then(response => {
            if (!isEmptyResponse(query, response)) {
                setTitle(response.data.result[0].title);
                setDate(response.data.result[0].date.substring(0, 4));
                setPub(response.data.result[0].pub);
                setLinkPDF(response.data.result[0].linkPDF);
                setUrl(response.data.result[0].url);
                setLicense(response.data.result[0].license);

                let lang = response.data.result[0].lang;
                if (lang !== undefined) {
                    switch(lang) {
                        case "ara":
                            lang = "Arabic";
                            break;
                        case "dut":
                            lang = "Dutch";
                            break;
                        case "eng":
                            lang = "English";
                            break;
                        case "fre":
                            lang = "French";
                            break;
                        case "ger":
                            lang = "German";
                            break;
                        case "ita":
                            lang = "Italian";
                            break;
                        case "por":
                            lang = "Portuguese";
                            break;
                        case "spa":
                            lang = "Spanish";
                            break;
                        case "ind":
                            lang = "Indonesian";
                            break;
                        case "lao":
                            lang = "Lao";
                            break;
                        case "mlg":
                            lang = "Malagasy";
                            break;
                        case "tha":
                            lang = "Thai";
                            break;
                        case "vie":
                            lang = "Vietnamese";
                            break;
                        default:
                            break;
                    }
                }
                setLang(lang);
                setLangUri(response.data.result[0].lang2);
            }
        })
    }, []);

    /**
     * Get the article's authors
     */
    useEffect(() => {
        let articleUri = new URLSearchParams(window.location.search).get("uri");
        let query = process.env.REACT_APP_BACKEND_URL + "/getArticleAuthors/?uri=" + articleUri;
        if (process.env.REACT_APP_LOG === "on") {
            console.log("Will submit backend query: " + query);
        }
        axios(query).then(response => {
            if (!isEmptyResponse(query, response)) {
                let authorsST = ''.substring(0);
                let listAuthors = response.data.result;
                listAuthors.forEach(element =>
                    authorsST = authorsST + element.authors.replace(',', '') + ", ");
                // Remove the last ", "
                authorsST = authorsST.substring(0, authorsST.length - 2);
                setAuthors(authorsST);
            }
        })
    });

    let langTag = (langUri === undefined) ?
        <span className="block">Language: {lang}</span> :
        <span className="block">Language: <a href={langUri}>{lang}</a></span>

    return (
        <div className="component">
            <div className="">
                <div>
                    <h1 className="">{title} </h1>
                    <p>
                        <span className="metadata font-weight-bold"> {authors}. </span>
                        <span className="metadata">{date}. </span>
                        <span className="metadata">{title}. </span>
                        <span className="metadata font-italic"> {pub}. </span>
                        <span className="block"><a href={url} target="_article_page">{url}</a></span>
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
                        {langTag}
                        <span className="block">Licence: <a href={license}>{license}</a></span>
                        <span className="block"><a href={linkPdf}>Download</a></span>
                    </td>
                </tr>

            </div>
        </div>
    );
};

export default Metadata;
