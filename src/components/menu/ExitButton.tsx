import React from "react";
import workLogger from "../../api/workLogger";

type Props = {
    trackLogRequest: (success: boolean, enter: boolean | null) => void,
    isInside: boolean
}

const ExitButton = (props: Props) => {
    const handleClick = async () => {
        try{
            if(props.isInside) {
                await workLogger.put("/log", {
                    dateString: new Date().toString()
                });
                props.trackLogRequest(true, false);
            } else {
                props.trackLogRequest(false, null);
            }
        } catch(err) {
            if(err.message === "Network Error") {
                props.trackLogRequest(true, false);
            }
        }
    }

    return <button className="btn btn-primary button" onClick={handleClick}>Exit</button>;
}

export default ExitButton;