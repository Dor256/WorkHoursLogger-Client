import React from "react";
import workLogger from "../api/workLogger";
import SuccessBanner from "./SuccessBanner";
import WorkLoggerMenu from "./menu/WorkLoggerMenu";
import "./App.scss";

type State = {
    logStatus: boolean,
    success: boolean,
    enter: boolean | null,
    isLoading: boolean
}

class App extends React.Component<{}, State> {
    state = { logStatus: false, success: true, enter: false, isLoading: true };

    componentDidMount = async () => {
        try {
            const response = await workLogger.get("/log", {
                    params: {
                        dateString: new Date().toString()
                    }
            });
            response.data ? this.setState({ enter: true, isLoading: false }) : this.setState({ enter: false, isLoading: false });
        } catch(err) {
            this.setState({ enter: true });
        } 
    }

    trackLogRequest = (success: boolean, enter: boolean | null) => {
        this.setState({ logStatus: true, success: success, enter: enter });
        setTimeout(() => this.setState({ logStatus: false }), 3000);
    }

    renderLoader = () => {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    renderContent = () => {
        return (
            <>
                <SuccessBanner mounted={this.state.logStatus} success={this.state.success}/>
                <WorkLoggerMenu trackLogRequest={this.trackLogRequest} isInside={this.state.enter}/>
            </>
        );
    }

    renderApp = () => {
        if(this.state.isLoading) {
            return this.renderLoader();
        }
        return this.renderContent();
    }

    render() {
        return this.renderApp();
    }
}

export default App;