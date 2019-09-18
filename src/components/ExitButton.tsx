import React from "react";
import workLogger from "../api/workLogger";

type Props = {
    trackLogRequest: (success: boolean) => void
}

const ExitButton = (props: Props) => {
    const handleClick = async () => {
        try{
            await workLogger.put("/log", {
                dateString: new Date().toString()
            });
            props.trackLogRequest(true);
        } catch(err) {
            if(err.message === "Network Error") {
                props.trackLogRequest(true);
            } else {
                props.trackLogRequest(false);
            }
        }
    }

    return <button className="btn btn-primary button" onClick={handleClick}>Exit</button>;
}

export default ExitButton;