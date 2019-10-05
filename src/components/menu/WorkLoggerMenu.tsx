import React from "react";
import EnterButton from "./EnterButton";
import ExitButton from "./ExitButton";
import SendLogButton from "./SendLogButton";
import "./WorkLoggerMenu.scss";
import GoogleAuth from "../GoogleAuth";

type Props = {
    trackLogRequest: (success: boolean, enter: boolean | null) => void,
    isInOffice: boolean | null,
    currentUser: GoogleUser | null
}

class WorkLoggerMenu extends React.Component<Props> {
    renderMenu = () => {
        if(this.props.currentUser && this.props.currentUser.isSignedIn() && this.props.isInOffice !== null) {
            return (
                <div className="menu">
                    <h1 className="heading">
                        <img className="techsee-icon" src={`${process.env.PUBLIC_URL}/icon.png`} alt=""/> Work Logger
                    </h1>
                    <EnterButton trackLogRequest={this.props.trackLogRequest} isInside={this.props.isInOffice}/>
                    <ExitButton trackLogRequest={this.props.trackLogRequest} isInside={this.props.isInOffice}/>
                    <SendLogButton trackLogRequest={this.props.trackLogRequest} isInside={this.props.isInOffice}/>
                </div>
            );
        }
        return <GoogleAuth/>;
    }

    render() {
        return this.renderMenu();
    }
}

export default WorkLoggerMenu;