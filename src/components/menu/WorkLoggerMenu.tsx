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

type State = {
}

class WorkLoggerMenu extends React.Component<Props, State> {
    state = {};

    render() {
        const { props } = this;
        return (
            <>
                <EnterButton onClick={props.onEmployeeEnter} inOffice={props.inOffice}/>
                <Button className="btn btn-primary button" onClick={props.onEmployeeLeave}>Exit</Button>
                <Button className="btn btn-primary button" onClick={props.onRequestLog}>Send Log</Button>
            </>
        );
    } 
}

export default WorkLoggerMenu;