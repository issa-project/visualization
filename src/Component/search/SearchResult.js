import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './SearchResult.css';
import {Col, Row} from "react-bootstrap";

/**
 *
 */
const SearchResult = (props) => {
    const {
        uri,
        title,
        authors,
        date,
        publisher
    } = props;

    return (
        <div>
            <Row className="result">
                <Col xs={10}>
                    <span className="result-title">{title}.&nbsp;</span>
                    <span className="result-authors">{authors}.&nbsp;</span>
                    <span className="">{date}.&nbsp;</span>
                    <span className="result-publisher">{publisher}. </span>
                </Col>
                <Col>
                    <span className="">
                        <Link to={"/notice?uri=" + uri} target={title}>View</Link>
                    </span>
                </Col>
            </Row>
            <div className="divider-light"/>
        </div>
    );
};

SearchResult.propTypes = {
    uri: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string,
    date: PropTypes.string,
    publisher: PropTypes.string
}

export default SearchResult;
