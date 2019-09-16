import React from "react";
import workLogger from "../api/workLogger";

const EnterButton = () => {
    const handleClick = () => {
        workLogger.post("/log", {
            dateString: new Date().toString()
        });
    }

    return <button className="button" onClick={handleClick}>Enter</button>;
}

export default EnterButton;