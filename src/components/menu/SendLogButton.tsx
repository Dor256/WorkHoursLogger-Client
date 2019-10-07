import React from "react";
import workLogger from "../../api/workLogger";
import { TrackLogRequestParams } from "../../types/types";

type Props = {
    trackLogRequest(params: TrackLogRequestParams): void,
    inOffice: boolean,
    userEmail: string
}

const SendLogButton = (props: Props) => {
    const handleClick = async () => {
        try {
            await workLogger.post("/send", {
                dateString: new Date().toString(),
                userEmail: props.userEmail
            });
            props.trackLogRequest({ success: true, inOffice: props.inOffice });
        } catch(err) {
            if(err.message === "Network Error") {
                props.trackLogRequest({ success: true, inOffice: false });
            } else {
                props.trackLogRequest({ success: false, bannerMessage: "Something Went Wrong!" });
            }
        }
    }

    return <button className="btn btn-primary button" onClick={handleClick}>Send Log</button>;
}

export default SendLogButton;