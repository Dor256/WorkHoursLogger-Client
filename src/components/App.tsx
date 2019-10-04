import React from "react";
import workLogger from "../api/workLogger";
import { validUser } from "../utils";
import clientId from "../api/OAuth";
import StatusBanner from "./StatusBanner";
import WorkLoggerMenu from "./menu/WorkLoggerMenu";
import LoadingSpinner from "./LoadingSpinner";
import "./App.scss";

type State = {
    logStatus: boolean,
    success: boolean,
    enter: boolean | null,
    isLoading: boolean,
    currentUser: GoogleUser | null
}


class App extends React.Component<{}, State> {
    state: State = { 
        logStatus: false,
        success: true,
        enter: false, 
        isLoading: true,
        currentUser: null 
    };

    componentDidMount = () => {
        gapi.load("auth2:client", this.onAuthLoad);
    }

    onAuthLoad = async () => {
        await gapi.client.init({ clientId: clientId,scope: "email" })
            const authInstance = gapi.auth2.getAuthInstance();
            authInstance.isSignedIn.listen(this.onSignIn);
            const user = authInstance.currentUser.get();
            if(!user.isSignedIn()){
                this.setState({ currentUser: user, isLoading: false });
            } else {
                this.setState({ currentUser: user, isLoading: true });
            }
            this.fetchAppStatus();
    }

    onSignIn = (signedIn: boolean) => {
        if(signedIn && validUser(this.state.currentUser)) {
            this.setState({ isLoading: false });
        } else {
            gapi.auth2.getAuthInstance().signOut();
        }
    }

    fetchAppStatus = async () => {
        if(this.state.currentUser && this.state.currentUser.isSignedIn()) {
            try {
                const response = await workLogger.get("/check");
                response.data ? this.setState({ enter: true, isLoading: false }) : this.setState({ enter: false, isLoading: false });
            } catch(err) {
                this.setState({ enter: true, isLoading: false });
            }
        } 
    }

    trackLogRequest = (success: boolean, enter: boolean | null) => {
        if(enter !== null) {
            this.setState({ logStatus: true, success: success, enter: enter });
        } else {
            this.setState({ logStatus: true, success: success });
        }
        setTimeout(() => this.setState({ logStatus: false }), 3000);
    }

    renderContent = () => {
        return (
            <>
                <StatusBanner mounted={this.state.logStatus} success={this.state.success}/>
                <WorkLoggerMenu 
                    trackLogRequest={this.trackLogRequest} 
                    isInOffice={this.state.enter} 
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