import React from "react";
import { ButtonProps } from "../../types/types";

const Button = (props: ButtonProps) => {
    const { className, textContent, onClick } = props;
    return <button className={className} onClick={onClick}>{textContent}</button>;
}

export default Button;