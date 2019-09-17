import React from "react";
import workLogger from "../api/workLogger";

type Props = {
    trackLogRequest: (logStatus: boolean) => void
}

const ExitButton = (props: Props) => {
    const handleClick = async () => {
        await workLogger.put("/log", {
            dateString: new Date().toString()
        });
        props.trackLogRequest(true);
    }

    return <button className="btn btn-primary button" onClick={handleClick}>Exit</button>;
}

export default ExitButton;