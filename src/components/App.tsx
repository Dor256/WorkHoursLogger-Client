import React from "react";
import SuccessBanner from "./SuccessBanner";
import WorkLoggerMenu from "./WorkLoggerMenu";

type State = {
    logStatus: boolean,
    success: boolean
}

class App extends React.Component<{}, State> {
    state = { logStatus: false, success: true };

    trackLogRequest = (success: boolean) => {
        this.setState({ logStatus: true, success: success });
        setTimeout(() => this.setState({ logStatus: false }), 3000);
    }

    render() {
        return (
            <>
                <SuccessBanner mounted={this.state.logStatus} success={this.state.success}/>
                <WorkLoggerMenu trackLogRequest={this.trackLogRequest}/>
            </>
        );
    }
}

export default App;