import React from "react";
import workLogger from "../../api/workLogger";
import { ButtonActionProps } from "../../types/types";
import Button from "../basics/Button";

const SendLogButton = (props: ButtonActionProps) => {
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

    return <Button className="btn btn-primary button" onClick={handleClick} textContent="Send Log"/>;
}

export default SendLogButton;