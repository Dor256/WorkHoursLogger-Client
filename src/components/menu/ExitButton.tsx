import React from "react";
import workLogger from "../../api/workLogger";
import { TrackLogRequestParams } from "../../types/types";

type Props = {
    trackLogRequest(params: TrackLogRequestParams): void,
    inOffice: boolean,
    userEmail: string
}

const ExitButton = (props: Props) => {
    const handleClick = async () => {
        try{
            if(props.inOffice) {
                await workLogger.put("/log", {
                    dateString: new Date().toString(),
                    userEmail: props.userEmail
                });
                props.trackLogRequest({ success: true, inOffice: false });
            } else {
                props.trackLogRequest({ success: false, inOffice: false, bannerMessage: "Can't exit without entering!" });
            }
        } catch(err) {
            if(err.message === "Network Error") {
                props.trackLogRequest({ success: true, inOffice: false });
            }
        }
    }

    return <button className="btn btn-primary button" onClick={handleClick}>Exit</button>;
}

export default ExitButton;