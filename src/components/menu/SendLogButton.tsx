import React from "react";
import workLogger from "../../api/workLogger";

type Props = {
    trackLogRequest: (success: boolean, enter: boolean | null) => void,
    isInside: boolean
}

const SendLogButton = (props: Props) => {
    const handleClick = async () => {
        try {
            // await workLogger.get("/log", {
            //     params: {
            //         dateString: new Date().toString()
            //     }
            // });
            props.isInside ? props.trackLogRequest(true, true) : props.trackLogRequest(true, false);
        } catch(err) {
            if(err.message === "Network Error") {
                props.trackLogRequest(true, false);
            } else {
                props.trackLogRequest(false, null);
            }
        }
    }

    return <button className="btn btn-primary button" onClick={handleClick}>Send Log</button>;
}

export default SendLogButton;