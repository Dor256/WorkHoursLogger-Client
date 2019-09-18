import React from "react";
import EnterButton from "./EnterButton";
import ExitButton from "./ExitButton";
import SendLogButton from "./SendLogButton";
import "./WorkLoggerMenu.scss";

type Props = {
    trackLogRequest: (success: boolean) => void
}

const WorkLoggerMenu = (props: Props) => {
    return (
        <div className="menu">
            <h1 className="heading">
                <img className="techsee-icon" src={`${process.env.PUBLIC_URL}/icon.png`} alt=""/> Work Logger
            </h1>
            <EnterButton trackLogRequest={props.trackLogRequest}/>
            <ExitButton trackLogRequest={props.trackLogRequest}/>
            <SendLogButton trackLogRequest={props.trackLogRequest}/>
        </div>
    );
}

export default WorkLoggerMenu;