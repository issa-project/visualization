import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataInfo = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <div className="entity">
            <Button id="Popover1" type="button">
                PCR
            </Button>
            <Popover placement="top" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                <PopoverHeader> PCR </PopoverHeader>
                <PopoverBody> in vitro method for producing large amounts of specific DNA or RNA fragments from small amounts of short oligonucleotide primers. </PopoverBody>
            </Popover>
        </div>
    );
}

export default DataInfo;
