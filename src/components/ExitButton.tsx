import React from "react";
import workLogger from "../api/workLogger";

const ExitButton = () => {
    const handleClick = () => {
        workLogger.put("/log", {
            dateString: new Date().toString()
        });
    }

    return <button className="button" onClick={handleClick}>Exit</button>;
}

export default ExitButton;