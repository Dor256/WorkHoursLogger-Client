import React from "react";
import "./StatusBanner.scss";

export type BootstrapAlertClass = 'alert-success' | 'alert-danger';

export type BannerMessage = {
    message: string;
    type: BootstrapAlertClass;
}

type StatusBannerProps = {
    bannerMessage?: BannerMessage;
}

type StatusBannerState = {
    visible: boolean;
    tempBannerMessage?: BannerMessage;
}

const OPACITY_TRANSITION_DELAY_MS = 1000;

export class StatusBanner extends React.Component<StatusBannerProps, StatusBannerState> {
    state: StatusBannerState = {
        visible: false
    }

    hideBanner = () => {
        this.setState({
            visible: false,
            tempBannerMessage: this.props.bannerMessage
        });
        setTimeout(() => {
            this.setState({
                tempBannerMessage: undefined
            });
        }, 1000);
    }

    componentWillReceiveProps(nextProps: StatusBannerProps) {
        if (this.state.visible && !nextProps.bannerMessage) {
            this.hideBanner();
        } else if (!this.state.visible && nextProps.bannerMessage) {
            this.setState({
                visible: true
            });
        }
    }

    render () {
        const {visible, tempBannerMessage} = this.state;
        const {message='', type=''} = this.props.bannerMessage || tempBannerMessage || {};
 
        return (
            <div className={`alert ${type}${visible ? " visible" : ''}`} style={{transition: `opacity ${OPACITY_TRANSITION_DELAY_MS}ms, top .5s`}} role="alert">
                {message}
            </div>
        );
    }
}
