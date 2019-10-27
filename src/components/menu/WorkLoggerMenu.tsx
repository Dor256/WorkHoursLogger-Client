import React from "react";
import "./WorkLoggerMenu.scss";
import EnterButton from "./EnterButton";
import Button from "../basics/Button";

type Props = {
    inOffice: boolean;
    onEmployeeEnter: () => void;
    onEmployeeLeave: () => void;
    onRequestLog: () => void;
}

const WorkLoggerMenu = (props: Props) => {
    const {inOffice, onEmployeeLeave, onRequestLog, onEmployeeEnter} = props;

    return (
        <>
            <EnterButton onClick={onEmployeeEnter} inOffice={inOffice}/>
            <Button className="btn btn-primary button" onClick={onEmployeeLeave}>Exit</Button>
            <Button className="btn btn-primary button" onClick={onRequestLog}>Send Log</Button>
        </>
    );
}

export default WorkLoggerMenu;