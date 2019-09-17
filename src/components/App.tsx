import React from "react";
import SuccessBanner from "./SuccessBanner";
import WorkLoggerMenu from "./WorkLoggerMenu";

type State = {
    logStatus: boolean
}

class App extends React.Component<{}, State> {
    state = { logStatus: false };

    trackLogRequest = (logStatus: boolean) => {
        this.setState({ logStatus: logStatus });
    }

    
    renderSuccessBanner = () => {
        if(this.state.logStatus) {
            return <SuccessBanner/>;
        }
        return null;
    }

    render() {
        return (
            <>
                {this.renderSuccessBanner()}
                <WorkLoggerMenu trackLogRequest={this.trackLogRequest}/>
            </>
        );
    }
}

export default App;