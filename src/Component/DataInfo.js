import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import wikiLogo from './wiki.png';
//import geoLogo from 'Geo.png';

import 'bootstrap/dist/css/bootstrap.min.css';

const DataInfo = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    return (

        <span className="entity">
            <Button id={props.index} type="button">
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
