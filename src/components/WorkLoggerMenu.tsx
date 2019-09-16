import React from "react";
import EnterButton from "./EnterButton";
import ExitButton from "./ExitButton";
import SendLogButton from "./SendLogButton";
import "./WorkLoggerMenu.scss";

const WorkLoggerMenu = () => {
    return (
        <div className="container">
            <img className="techsee-icon" src={`${process.env.PUBLIC_URL}/icon.png`} alt=""/>
            <h1 className="heading">Work Logger</h1>
            <EnterButton/>
            <ExitButton/>
            <SendLogButton/>
        </div>
    );
}

export default WorkLoggerMenu;