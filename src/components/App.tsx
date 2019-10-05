import React from "react";
import workLogger from "../api/workLogger";
import { validUser, isUsingSafari } from "../utils";
import clientId from "../api/OAuth";
import StatusBanner from "./StatusBanner";
import WorkLoggerMenu from "./menu/WorkLoggerMenu";
import LoadingSpinner from "./LoadingSpinner";
import "./App.scss";

type State = {
    logStatus: boolean,
    success: boolean,
    inOffice: boolean | null,
    isLoading: boolean,
    currentUser: GoogleUser | null,
    bannerMessage: string
}


class App extends React.Component<{}, State> {
    state: State = { 
        logStatus: false,
        success: true,
        inOffice: false, 
        isLoading: true,
        currentUser: null,
        bannerMessage: "" 
    };

    componentDidMount = () => {
        gapi.load("auth2:client", this.onAuthLoad);
    }

    onAuthLoad = async () => {
        try {
            await gapi.client.init({ clientId: clientId, scope: "email" });
            const authInstance = gapi.auth2.getAuthInstance();
            authInstance.isSignedIn.listen(this.onSignIn);
            const user = authInstance.currentUser.get();
            if(!user.isSignedIn()){
                this.setState({ currentUser: user, isLoading: false });
            } else {
                this.setState({ currentUser: user, isLoading: true });
            }
            this.fetchAppStatus();
        } catch(err) {
            if(isUsingSafari) {
                alert("There is a bug with Safari, please clear your cache and try again in 5 minutes or open in private mode");
            }
        }
    }

    onSignIn = (signedIn: boolean) => {
        if(signedIn && this.state.currentUser) {
            if(validUser(this.state.currentUser)){
                this.setState({ isLoading: false });
            } else {
                gapi.auth2.getAuthInstance().signOut();
                this.trackLogRequest(false, this.state.inOffice, "You need a TechSee email to use this app")
            }
        }
    }

    fetchAppStatus = async () => {
        if(this.state.currentUser && this.state.currentUser.isSignedIn()) {
            try {
                const response = await workLogger.post("/check", {
                    userEmail: this.state.currentUser.getBasicProfile().getEmail()
                });
                response.data ? this.setState({ inOffice: true, isLoading: false }) : this.setState({ inOffice: false, isLoading: false });
            } catch(err) {
                this.setState({ inOffice: true, isLoading: false });
            }
        } 
    }

    trackLogRequest = (success: boolean, inOffice: boolean | null, bannerMessage?: string) => {
        const message = bannerMessage ? bannerMessage : "";
        if(inOffice !== null) {
            this.setState({ logStatus: true, success: success, inOffice: inOffice, bannerMessage: message });
        } else {
            this.setState({ logStatus: true, success: success, bannerMessage: message });
        }
        setTimeout(() => this.setState({ logStatus: false }), 3000);
    }

    renderContent = () => {
        return (
            <>
                <StatusBanner 
                    mounted={this.state.logStatus} 
                    success={this.state.success}
                    message={this.state.bannerMessage}
                />
                <WorkLoggerMenu 
                    trackLogRequest={this.trackLogRequest} 
                    isInOffice={this.state.inOffice} 
                    currentUser={this.state.currentUser}
                />
            </>
        );
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingSpinner/>
        }
        return this.renderContent();
    }
}

export default App;