import React from "react";
import EnterButton from "./EnterButton";
import ExitButton from "./ExitButton";
import SendLogButton from "./SendLogButton";
import "./WorkLoggerMenu.scss";
import GoogleAuth from "../GoogleAuth";
import { validUser } from "../../utils";

type Props = {
    trackLogRequest: (success: boolean, enter: boolean | null, bannerMessage?: string) => void,
    isInOffice: boolean | null,
    currentUser: GoogleUser | null
}

const WorkLoggerMenu = (props: Props) => {
    const renderMenu = () => {
        if(props.currentUser && props.currentUser.isSignedIn() && validUser(props.currentUser) && props.isInOffice !== null) {
            const userEmail = props.currentUser.getBasicProfile().getEmail();
            return (
                <div className="menu">
                    <h1 className="heading">
                        <img className="techsee-icon" src={`${process.env.PUBLIC_URL}/icon.png`} alt=""/> Work Logger
                    </h1>
                    <EnterButton trackLogRequest={props.trackLogRequest} isInside={props.isInOffice} userEmail={userEmail}/>
                    <ExitButton trackLogRequest={props.trackLogRequest} isInside={props.isInOffice} userEmail={userEmail}/>
                    <SendLogButton trackLogRequest={props.trackLogRequest} isInside={props.isInOffice} userEmail={userEmail}/>
                </div>
            );
        }
        return <GoogleAuth/>;
    }

    return renderMenu();
}

export default WorkLoggerMenu;