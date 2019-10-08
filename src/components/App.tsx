import React from "react";
import { validUser, isUsingSafari } from "../utils";
import clientId from "../api/OAuth";
import StatusBanner from "./StatusBanner";
import WorkLoggerMenu from "./menu/WorkLoggerMenu";
import LoadingSpinner from "./LoadingSpinner";
import "./App.scss";
import GoogleAuth from "./GoogleAuth";
import { ButtonProps } from "../types/types";
import EnterButton from "./menu/EnterButton";
import ExitButton from "./menu/ExitButton";
import SendLogButton from "./menu/SendLogButton";

type State = {
    isLoading: boolean,
    showBanner: boolean,
    userEmail: string,
}


class App extends React.Component<{}, State> {
    state: State = { isLoading: true, showBanner: false, userEmail: "" };
    private bannerMessage = "You need a TechSee email to use this app";
    private currentUser?: GoogleUser;

    componentDidMount = () => {
        gapi.load("auth2:client", this.onAuthLoad);
    }

    onAuthLoad = async () => {
        try {
            await gapi.client.init({ clientId: clientId, scope: "email" });
            const authInstance = gapi.auth2.getAuthInstance();
            this.currentUser = authInstance.currentUser.get();
            const basicUserProfile = this.currentUser.getBasicProfile();
            authInstance.isSignedIn.listen(this.onSignIn);
            const userEmail = basicUserProfile ? basicUserProfile.getEmail() : "";
            this.setState({ isLoading: false, userEmail: userEmail });
        } catch(err) {
            if(isUsingSafari) {
                alert("There is a bug with Safari, please clear your cache and try again in 5 minutes or open in private mode");
            }
        }
    }

    onSignIn = (signedIn: boolean) => {
        if(signedIn && this.currentUser && validUser(this.currentUser)) {
            const userEmail = this.currentUser.getBasicProfile().getEmail();
            this.setState({ isLoading: false, userEmail: userEmail });
        } else if(!this.currentUser || !validUser(this.currentUser)) {
            if(!signedIn) {
                this.setState({ showBanner: true })
                setTimeout(() => this.setState({ showBanner: false }), 3000);
            } else {
                gapi.auth2.getAuthInstance().signOut();
            }
        }
    }

    renderWorkLoggerButtons = (props: ButtonProps) => {
        return (
            <>
                <EnterButton {...props}/>
                <ExitButton {...props}/>
                <SendLogButton {...props}/>
            </>
        );
    }

    render() {
        const { state } = this;
        if(state.isLoading) {
            return <LoadingSpinner/>;
        }
        if(!validUser(this.currentUser!)) {
            return (
                <>
                    <StatusBanner mounted={state.showBanner} success={false} message={this.bannerMessage}/>
                    <GoogleAuth/>
                </>
            );
        }
        return (
            <WorkLoggerMenu userEmail={state.userEmail}>
                {this.renderWorkLoggerButtons}
            </WorkLoggerMenu>
        );
    }
}

export default App;