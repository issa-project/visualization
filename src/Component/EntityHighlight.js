import React, {useState} from 'react';
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import wikiLogo from './images/wiki.png';
import './EntityHighlight.css';

/**
 * Ce Composant qui est un hook représente la pop-up affiché dans le composant textHilight :
 * @param  index : identifiant de chaque pop-up , title : le titre de la pop-up , content : le contenue de la pop-up
 * @returns {*}
 * @constructor
 */
const EntityHighlight = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <span className="entity">
            <Button id={props.index} type="button" className="btn  highlight-entity">
                {props.word}
            </Button>
            <Popover placement="auto" isOpen={popoverOpen} target={props.index} toggle={toggle}>
                { /* <PopoverHeader> {props.title} </PopoverHeader> */ }
                <PopoverBody> {props.content} </PopoverBody>
                <div className="linkContent">
                    <a href={props.entityUri} target="_external_entity">
                        <span className="imgLink"><img src={wikiLogo} alt="Wikidata logo"/> </span>
                        <span>{props.title}</span>
                    </a>
                </div>
            </Popover>
        </span>
    );
}

export default EntityHighlight;
