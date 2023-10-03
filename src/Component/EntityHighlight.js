import React, {useState} from 'react';
import {Button, Popover, PopoverHeader} from 'reactstrap';
import { BsFillPersonFill } from "react-icons/bs";
import { LiaRobotSolid } from "react-icons/lia";

import './EntityHighlight.css';

/**
 * Highlighted text span with a pop-over.
 * Used to highlight both articles' named entities or global descriptors.
 *
 * @param props : object contains the following:
 * id: pop-over identifier, title, entityLabel, entityUri
 * word: exact text of the entity
 * title: popover title
 * content: popover content
 * icons: optional comma-separated list of types of icon to add, each is one of: human, computed
 * @returns {*}
 */
const EntityHighlight = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    let icon = []
    if (props.icons !== undefined) {
        if (props.icons.includes("human"))
            icon.push(<BsFillPersonFill/>);
        if (props.icons.includes("computed"))
            icon.push(<LiaRobotSolid/>);
    }

    return (
        <span className="entity">
            <Button id={props.id} type="button" className="btn highlight-entity">
                {props.word} {icon}
            </Button>
            <Popover placement="auto" isOpen={popoverOpen} target={props.id} toggle={toggle}>
                <PopoverHeader> {props.title} </PopoverHeader>
                <div className="popoverContent">
                    {props.content}
                </div>
            </Popover>
        </span>
    );
}

export default EntityHighlight;
