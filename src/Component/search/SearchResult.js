import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {BiDownload} from "react-icons/bi";
import {HiOutlineDocumentMagnifyingGlass} from "react-icons/hi2";
import './SearchResult.css';
import {useEffect, useState} from "react";

/**
 * Represent a single article that was returned by the search action
 */
const SearchResult = (props) => {
    const {
        document,
        title,
        authors,
        date,
        publisher,
        lang,
        linkPDF
    } = props;

    const [firstAuthors, setFirstAuthors] = useState('');

    // Limit the number of authors displayed
    const maxAuthors = 3;

    /**
     * Format the list of authors by limiting the total number
     * and adding [...] at the end if needed
     */
    useEffect(() => {
        let _firstAuthors = "";
        let _firstAuthorsArr = authors.split('$');
        _firstAuthorsArr.forEach((_a, _index) => {
            if (_index === 0)
                _firstAuthors = _a;
            else if (_index < maxAuthors) {
                _firstAuthors += ', ' + _a;
            }
        })
        if (_firstAuthorsArr.length > maxAuthors) {
            _firstAuthors += ' [...]';
        }
        setFirstAuthors(_firstAuthors);
    }, [authors]);


    return (
        <div>
            <Row className="result align-items-center">
                <Col xs={11}>
                    <span className="result-title">{title}.&nbsp;</span>
                    <span className="result-authors">{firstAuthors}.&nbsp;</span>
                    <span className="">{date}.&nbsp;</span>
                    <span className="fst-italic">{publisher}. </span>
                </Col>
                <Col xs={1} className="fs-5">
                    <Link className="a_icons" to={"/notice?uri=" + document}
                          target={title}><HiOutlineDocumentMagnifyingGlass/></Link>
                    &nbsp;
                    <a href={linkPDF} target={title}><BiDownload/></a>
                </Col>
            </Row>
            <div className="divider-light"/>
        </div>
    );
};

SearchResult.propTypes = {
    document: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string,
    date: PropTypes.string,
    publisher: PropTypes.string,
    lang: PropTypes.string,
    linkPDF: PropTypes.string
}

export default SearchResult;
