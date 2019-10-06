import React from "react";
import workLogger from "../../api/workLogger";
import "./EnterButton.scss";

type Props = {
    trackLogRequest: (success: boolean, enter: boolean | null, bannerMessage?: string) => void,
    isInside: boolean,
    userEmail: string
}

const EnterButton = (props: Props) => {

    const handleClick = async () => {
        try {
            if(!props.isInside) {
                await workLogger.post("/log", {
                    dateString: new Date().toString(),
                    userEmail: props.userEmail
                });
                props.trackLogRequest(true, true);
            }
        } catch(err) {
            if(err.message === "Network Error") {
                props.trackLogRequest(true, true);
            } else {
                props.trackLogRequest(false, false, "Something Went Wrong!");
            }
        }
    }

    const renderButton = () => {
        if(props.isInside) {
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