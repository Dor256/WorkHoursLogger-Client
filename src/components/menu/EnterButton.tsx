import React from "react";
import "./EnterButton.scss";
import Button from "../basics/Button";
import Container from "../basics/Container";

export type EnterButtonProps = {
    inOffice: boolean;
    onClick: () => void;
};

const EnterButton = (props: EnterButtonProps) => {

    const baseButton = <Button onClick={props.onClick} className={`btn btn-primary button${props.inOffice ? ' enter-button' : ''}`}>Enter</Button>
    return props.inOffice ? (
        <Container className="entered-border">
            {baseButton}
        </Container>
    ) : baseButton;
}

export default EnterButton;