import React from "react";
import workLogger from "../api/workLogger";

type Props = {
    trackLogRequest: (logStatus: boolean) => void
}

const SendLogButton = (props: Props) => {
    const handleClick = async () => {
        await workLogger.get("/log", {
            params: {
                dateString: new Date().toString()
            }
        });
        props.trackLogRequest(true);
    }

    return <button className="btn btn-primary button" onClick={handleClick}>Send Log</button>;
}

export default SendLogButton;