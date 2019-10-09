import React from "react";
import { validUser, isUsingSafari } from "../utils";
import clientId from "../api/OAuth";
import StatusBanner from "./StatusBanner";
import WorkLoggerMenu from "./menu/WorkLoggerMenu";
import LoadingSpinner from "./LoadingSpinner";
import GoogleAuth from "./GoogleAuth";
import Container from "./basics/Container";
import Header from "./menu/Header";
import "./App.scss";

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
            authInstance.isSignedIn.listen(this.onAuthAction);
            const userEmail = basicUserProfile ? basicUserProfile.getEmail() : "";
            this.setState({ isLoading: false, userEmail: userEmail });
        } catch(err) {
            if(isUsingSafari) {
                alert("There is a bug with Safari, please clear your cache and try again in 5 minutes or open in private mode");
            }
        }
    }

    onAuthAction = (signedIn: boolean) => {
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

    renderBanner = (shouldRenderMenu: boolean) => {
        if(!shouldRenderMenu) {
            return (
                <StatusBanner 
                    mounted={this.state.showBanner} 
                    success={false} 
                    message={this.bannerMessage}
                />
            );
        }
    }

    renderContents = (shouldRenderMenu: boolean) => {
        if(shouldRenderMenu) {
            return <WorkLoggerMenu userEmail={this.state.userEmail}/>;
        }
        return <GoogleAuth/>;
    }

    render() {
        const { state, currentUser } = this;
        if(state.isLoading) {
            return <LoadingSpinner/>;
        }
        const shouldRenderMenu = validUser(currentUser!);
        return (
            <Container className="menu">
                <Header text="Work Logger"/>
                {this.renderBanner(shouldRenderMenu)}
                {this.renderContents(shouldRenderMenu)}
            </Container>
        );
    }
}

export default App;