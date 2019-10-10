import React from "react";

export type  ButtonProps = {
    className: string,
    children?: string | JSX.Element,
    onClick(): void
}

const Button = (props: ButtonProps) => {
    const { className, children, onClick } = props;
    return <button className={className} onClick={onClick}>{children}</button>;
}

export default Button;