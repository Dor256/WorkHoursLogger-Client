import React from "react";
import EnterButton from "./EnterButton";
import ExitButton from "./ExitButton";
import SendLogButton from "./SendLogButton";
import "./WorkLoggerMenu.scss";
import GoogleAuth from "../GoogleAuth";

type Props = {
    trackLogRequest: (success: boolean, enter: boolean | null, bannerMessage?: string) => void,
    isInOffice: boolean | null,
    currentUser: GoogleUser | null
}

const WorkLoggerMenu = (props: Props) => {
    const renderMenu = () => {
        if(props.currentUser && props.currentUser.isSignedIn() && props.isInOffice !== null) {
            return (
                <div className="menu">
                    <h1 className="heading">
                        <img className="techsee-icon" src={`${process.env.PUBLIC_URL}/icon.png`} alt=""/> Work Logger
                    </h1>
                    <EnterButton trackLogRequest={props.trackLogRequest} isInside={props.isInOffice}/>
                    <ExitButton trackLogRequest={props.trackLogRequest} isInside={props.isInOffice}/>
                    <SendLogButton trackLogRequest={props.trackLogRequest} isInside={props.isInOffice}/>
                </div>
            );
        }
        return <GoogleAuth/>;
    }

    return renderMenu();
}

export default WorkLoggerMenu;