import React from "react";
import workLogger from "../../api/workLogger";
import StatusBanner from "../StatusBanner";
import "./WorkLoggerMenu.scss";
import { TrackLogRequestParams, ButtonProps } from "../../types/types";
import LoadingSpinner from "../LoadingSpinner";
import Header from "./Header";

type Props = {
    userEmail: string,
    children(props: ButtonProps): JSX.Element
}

type State = {
    inOffice: boolean,
    showBanner: boolean,
    isLoading: boolean
}

class WorkLoggerMenu extends React.Component<Props, State> {
    private bannerMessage = "";
    private success: boolean | null = null;
    state: State = { inOffice: false, showBanner: false, isLoading: true };

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

    render() {
        const { state, props, success, bannerMessage, trackLogRequest} = this;
        const buttonProps = { inOffice: state.inOffice, trackLogRequest, userEmail: props.userEmail}
        if(state.isLoading) {
            return <LoadingSpinner/>;
        }
        return (
            <>
                <StatusBanner mounted={state.showBanner} success={success!} message={bannerMessage}/>
                <div className="menu">
                    <Header text={"Work Logger"}/>
                    {this.props.children({ ...buttonProps })}
                </div>
            </>
        );
    } 
}

export default WorkLoggerMenu;