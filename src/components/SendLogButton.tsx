import React from "react";
import workLogger from "../api/workLogger";

const SendLogButton = () => {
    const handleClick = () => {
        workLogger.get("/log", {
            params: {
                dateString: new Date().toString()
            }
        });
    }

    return <button className="button" onClick={handleClick}>Send Log</button>;
}

export default SendLogButton;