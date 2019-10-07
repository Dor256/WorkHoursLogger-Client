import React from "react";
import workLogger from "../../api/workLogger";
import EnterButton from "./EnterButton";
import ExitButton from "./ExitButton";
import SendLogButton from "./SendLogButton";
import StatusBanner from "../StatusBanner";
import "./WorkLoggerMenu.scss";
import { TrackLogRequestParams } from "../../types/types";
import LoadingSpinner from "../LoadingSpinner";

type Props = {
    userEmail: string
}

type State = {
    inOffice: boolean | null,
    showBanner: boolean,
    isLoading: boolean
}

class WorkLoggerMenu extends React.Component<Props, State> {
    private bannerMessage = "";
    private success: boolean | null = null;
    state: State = { inOffice: null, showBanner: false, isLoading: true };

    componentDidMount = async () => {
        const response = await workLogger.post("/check", {
            userEmail: this.props.userEmail
        });
        this.setState({ inOffice: response.data, isLoading: false });
    }

    trackLogRequest = (params: TrackLogRequestParams) => {
        const { success, inOffice, bannerMessage } = params;
        this.bannerMessage = bannerMessage ? bannerMessage : "";
        this.success = success;
        if(inOffice !== undefined) {
            this.setState({ showBanner: true, inOffice: inOffice });
        } else {
            this.setState({ showBanner: true });
        }
        setTimeout(() => this.setState({ showBanner: false }), 3000);
    }

    renderMenu = () => {
        const { props, state } = this;
        if(state.inOffice !== null) {
            return (
                <div className="menu">
                    <h1 className="heading">
                        <img className="techsee-icon" src={`${process.env.PUBLIC_URL}/icon.png`} alt=""/> Work Logger
                    </h1>
                    <EnterButton trackLogRequest={this.trackLogRequest} inOffice={state.inOffice} userEmail={props.userEmail}/>
                    <ExitButton trackLogRequest={this.trackLogRequest} inOffice={state.inOffice} userEmail={props.userEmail}/>
                    <SendLogButton trackLogRequest={this.trackLogRequest} inOffice={state.inOffice} userEmail={props.userEmail}/>
                </div>
            );
        }
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingSpinner/>;
        }
        return (
            <>
                <StatusBanner mounted={this.state.showBanner} success={this.success!} message={this.bannerMessage}/>
                {this.renderMenu()}
            </>
        );
    } 
}

export default WorkLoggerMenu;