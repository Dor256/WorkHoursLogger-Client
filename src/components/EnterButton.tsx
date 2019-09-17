import React from "react";
import workLogger from "../api/workLogger";

type Props = {
    trackLogRequest: (logStatus: boolean) => void
}

const EnterButton = (props: Props) => {

    const handleClick = async () => {
        await workLogger.post("/log", {
            dateString: new Date().toString()
        });
        props.trackLogRequest(true);
    }

    return <button className="btn btn-primary button" onClick={handleClick}>Enter</button>;
}

export default EnterButton;