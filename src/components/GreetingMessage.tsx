import React from "react";
import Header from "./basics/Header";

type GreetingMessageProps = {
    userName: string,
    currentHour: number
}

const GreetingMessage = (props: GreetingMessageProps) => {
    const {userName, currentHour} = props;

    const getMessageText = (): string => {
        if(currentHour < 12 && currentHour > 0) {
            return `Good Morning, ${userName}`;
        } else if(currentHour >= 12 && currentHour < 18) {
            return `Good Afternoon, ${userName}`;
        }
        return `Good Evening, ${userName}`;
    }

    return (
        <Header className="heading welcome-heading">
            {getMessageText()}
        </Header>
    );
}

export default GreetingMessage;