import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import './buttonAnnotate.css';

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton() {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading( true);

    return (
        <Button
            className="buttonA"
            variant="dark"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? 'Loading…' : 'Annotate'}
        </Button>
    );
}

export default LoadingButton;
