import React from "react";
import { ContainerProps } from "../../types/types";

const Container = (props: ContainerProps) => {
    const { className, children } = props;

    return <div className={className}>{children}</div>;
}

export default Container;