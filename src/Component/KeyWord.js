import {Component} from "react";


const DataInfo = (props) => {

    {
        ['top', 'right', 'bottom', 'left'].map((placement) => (
        return (
            <OverlayTrigger
                trigger="click"
                key={placement}
                placement={placement}
                overlay={
                    <Popover id={`popover-positioned-${placement}`}>
                        <Popover.Title as="h3">{`Popover ${placement}`}</Popover.Title>
                        <Popover.Content>
                            <strong>Holy guacamole!</strong> Check this info.
                        </Popover.Content>
                    </Popover>
                }
            >
                <Button variant="secondary">Popover on {placement}</Button>
            </OverlayTrigger>

        )


    ));
    }
}

