import React from "react";
import EnterButton from "./EnterButton";
import Button from "../basics/Button";
import { Link } from "react-router-dom";

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
            <Link className="btn btn-primary button" to="/show">Show Log</Link>
        </>
    );
}

export default WorkLoggerMenu;