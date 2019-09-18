import React from "react";
import workLogger from "../api/workLogger";

type Props = {
    trackLogRequest: (success: boolean) => void
}

const SendLogButton = (props: Props) => {
    const handleClick = async () => {
        try {
            await workLogger.get("/log", {
                params: {
                    dateString: new Date().toString()
                }
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

    return <button className="btn btn-primary button" onClick={handleClick}>Send Log</button>;
}

export default SendLogButton;