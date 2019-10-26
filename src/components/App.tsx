import React from "react";
import { validUser, isUsingSafari } from "../utils";
import clientId from "../api/OAuth";
import workLogger from "../api/workLogger";
import {StatusBanner, BannerMessage, BootstrapAlertClass } from "./StatusBanner";
import LoadingSpinner from "./LoadingSpinner";
import GoogleAuth from "./GoogleAuth";
import Container from "./basics/Container";
import MenuHeader from "./basics/MenuHeader";
import WorkLoggerMenu from "./menu/WorkLoggerMenu";
import "./App.scss";
import HelloMessage from "./HelloMessage";

type State = {
    isLoading: boolean,
    bannerMessage?: BannerMessage,
    userEmail: string,
    inOffice: boolean,
    user?: GoogleUser
}

const BANNER_CLOSE_DELAY = 3000;

class App extends React.Component<{}, State> {
    state: State = {
        isLoading: true,
        userEmail: "",
        inOffice: false
    };

    componentDidMount = () => {
        gapi.load("auth2:client", this.onAuthLoad);
    }

    onAuthLoad = async () => {
        try {
            await gapi.client.init({ clientId: clientId, scope: "email" });
            const authInstance = gapi.auth2.getAuthInstance();
            const user = authInstance.currentUser.get();
            const basicUserProfile = user.getBasicProfile();
            authInstance.isSignedIn.listen(this.onAuthAction(user));
            if(!user.getBasicProfile()) {
                this.setState({ isLoading: false });
            }
            const userEmail = basicUserProfile.getEmail();
            workLogger.post("/check", {
                userEmail
            }).then((res: {data: boolean}) => {
                this.setState({
                    inOffice: res.data,
                    isLoading: false,
                    userEmail,
                    user
                })
            });
        } catch(err) {
            if(isUsingSafari) {
                alert("There is a bug with Safari, please clear your cache and try again in 5 minutes or open in private mode");
            }
        }
    }

    hideBanner = () => {
        this.setState({
            bannerMessage: undefined
        })
    }

    showBanner = (message: string, type: BootstrapAlertClass = 'alert-success', hideDelay: number = BANNER_CLOSE_DELAY) => {
        this.setState({
            bannerMessage: {
                message,
                type,
            }
        });

        setTimeout(() => {
            const bannerMessageChanged = !this.state.bannerMessage || this.state.bannerMessage.message !== message || this.state.bannerMessage.type !== type;
            if (!bannerMessageChanged) {
                this.hideBanner();
            }
        }, hideDelay);
    }

    onAuthAction = (currentUser: GoogleUser) => (signedIn: boolean) => {
        const userValid = validUser(currentUser);
        if (signedIn && userValid) {
            const userEmail = currentUser.getBasicProfile().getEmail();
            this.setState({ isLoading: false, userEmail, user: currentUser });
        } else if (!userValid) {
            if (signedIn) {
                gapi.auth2.getAuthInstance().signOut();
            } else {
                this.showBanner("You need a TechSee email to use this app", 'alert-danger');
            }
        }
    }

    onEmployeeEnter = async () => {
        const {inOffice, userEmail} = this.state;
        try {
            if(!inOffice) {
                await workLogger.post("/log", {
                    dateString: new Date().toString(),
                    userEmail
                });
                this.setState({
                    inOffice: true
                });
                this.showBanner("Swiped in successfuly");
            } else {
                this.showBanner("Tried to swipe in while already swiped", 'alert-danger');
            }
        } catch(err) {
            this.showBanner("Failed to swipe in", 'alert-danger');
            console.error(err);
        }
    }

    onEmployeeLeave = async () => {
        const {inOffice, userEmail} = this.state;
        try{
            if(inOffice) {
                await workLogger.put("/log", {
                    dateString: new Date().toString(),
                    userEmail
                });
                this.setState({
                    inOffice: false
                })
                this.showBanner('Swiped out successfuly');
            } else {
                this.showBanner("Can't exit without entering", 'alert-danger');
            }
        } catch(err) {
            if(err.message === "Network Error") {
                this.showBanner("Failed to swipe out", 'alert-danger');
                console.error(err);
            }
        }
    }

    onRequestLog = async () => {
        const {userEmail} = this.state;
        try {
            await workLogger.post("/send", {
                dateString: new Date().toString(),
                userEmail
            });
            this.showBanner('Log sent successfuly')
        } catch(err) {
            this.showBanner("Failed to send log", 'alert-danger');
            console.error(err);
        }
    }

    render() {
        const { state } = this;
        if(state.isLoading) {
            return (
                <Container className="app-container">
                    <LoadingSpinner/>
                </Container>
            );
        }

        if (!(state.user && validUser(state.user))) {
            return (
                <Container className="app-container menu auth">
                    <MenuHeader/>
                    <GoogleAuth/>
                </Container>
            );
        }
        return (
            <>
                <HelloMessage userName={state.user.getBasicProfile().getName()}/>
                <Container className="app-container menu">
                    <StatusBanner bannerMessage={this.state.bannerMessage}/>
                    <MenuHeader/>
                    <WorkLoggerMenu
                        onEmployeeEnter={this.onEmployeeEnter}
                        onEmployeeLeave={this.onEmployeeLeave}
                        onRequestLog={this.onRequestLog}
                        inOffice={this.state.inOffice}
                    />
                </Container>
            </>
        );
    }
}

export default App;