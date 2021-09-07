import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import wikiLogo from './images/wiki.png';
import './DataInfo.css';
//import geoLogo from 'Geo.png';

/**
 * Ce Composant qui est un hook représente la pop-up affiché dans le composant textHilight :
 * @param  index : identifiant de chaque pop-up , title : le titre de la pop-up , content : le contenue de la pop-up
 * @returns {*}
 * @constructor
 */
const DataInfo = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <span className="entity">
            <Button id={props.index} type="button" className="buttonW">
                {props.word}
            </Button>
            <Popover placement="top" isOpen={popoverOpen} target={props.index} toggle={toggle}>
                <PopoverHeader> {props.title} </PopoverHeader>
                <PopoverBody> {props.content} </PopoverBody>
                <div className= "linkContent">
                    <a href= "https://www.wikidata.org/wiki/Q89469904">
                        <span className="imgLink"><img src={wikiLogo} alt="wikidata logo"/> </span>
                        <span>{props.title}</span>
                    </a>
                </div>
            </Popover>
        </span>
    );
}

export default DataInfo;
