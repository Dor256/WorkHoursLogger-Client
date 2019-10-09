import React from "react";
import workLogger from "../../api/workLogger";
import "./EnterButton.scss";
import { ButtonActionProps } from "../../types/types";
import Button from "../basics/Button";
import Container from "../basics/Container";

const EnterButton = (props: ButtonActionProps) => {

    const handleClick = async () => {
        try {
            if(!props.inOffice) {
                await workLogger.post("/log", {
                    dateString: new Date().toString(),
                    userEmail: props.userEmail
                });
                props.trackLogRequest({ success: true, inOffice: true });
            }
        } catch(err) {
            if(err.message === "Network Error") {
                props.trackLogRequest({ success: true, inOffice: true });
            } else {
                props.trackLogRequest({ success: false, inOffice: false, bannerMessage: "Something Went Wrong!" });
            }
        }
    }

    const renderButton = () => {
        if(props.inOffice) {
            return (
                <Container className="entered-border">
                    <Button 
                        className="btn btn-primary button enter-button" 
                        onClick={handleClick} 
                        textContent="Enter"
                    />;
                </Container>
            );
        }
        return <Button 
                    className="btn btn-primary button" 
                    onClick={handleClick} 
                    textContent="Enter"
                />;
    }

    return renderButton();
}

export default EnterButton;