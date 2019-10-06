import React from "react";
import workLogger from "../../api/workLogger";

type Props = {
    trackLogRequest: (success: boolean, enter: boolean | null, bannerMessage?: string) => void,
    isInside: boolean,
    userEmail: string
}

const SendLogButton = (props: Props) => {
    const handleClick = async () => {
        try {
            await workLogger.post("/send", {
                dateString: new Date().toString(),
                userEmail: props.userEmail
            });
            props.isInside ? props.trackLogRequest(true, true) : props.trackLogRequest(true, false);
        } catch(err) {
            if(err.message === "Network Error") {
                props.trackLogRequest(true, false);
            } else {
                props.trackLogRequest(false, null, "Something Went Wrong!");
            }
        }
    }

    return <button className="btn btn-primary button" onClick={handleClick}>Send Log</button>;
}

export default SendLogButton;