import React from "react";
import EnterButton from "./EnterButton";
import ExitButton from "./ExitButton";
import SendLogButton from "./SendLogButton";
import "./WorkLoggerMenu.scss";

type Props = {
    trackLogRequest: (success: boolean, enter: boolean | null) => void,
    isInside: boolean
}

const WorkLoggerMenu = (props: Props) => {
    return (
        <div className="menu">
            <h1 className="heading">
                <img className="techsee-icon" src={`${process.env.PUBLIC_URL}/icon.png`} alt=""/> Work Logger
            </h1>
            <EnterButton trackLogRequest={props.trackLogRequest} isInside={props.isInside}/>
            <ExitButton trackLogRequest={props.trackLogRequest} isInside={props.isInside}/>
            <SendLogButton trackLogRequest={props.trackLogRequest} isInside={props.isInside}/>
        </div>
    );
}

export default WorkLoggerMenu;