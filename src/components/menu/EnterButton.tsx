import React from "react";
import workLogger from "../../api/workLogger";
import "./EnterButton.scss";
import { ButtonProps } from "../../types/types";

const EnterButton = (props: ButtonProps) => {

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
                <div className="entered-border">
                    <button className="btn btn-primary button enter-button" onClick={handleClick}>Enter</button>
                </div>
            );
        }
        return <button className="btn btn-primary button" onClick={handleClick}>Enter</button>;
    }

    return renderButton();
}

export default EnterButton;