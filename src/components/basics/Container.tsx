import React from "react";

export type ContainerProps = {
    className: string;
    children?: string | JSX.Element | JSX.Element[];
}

const Container = (props: ContainerProps) => {
    const { className, children } = props;

    return <div className={className}>{children}</div>;
}

export default Container;