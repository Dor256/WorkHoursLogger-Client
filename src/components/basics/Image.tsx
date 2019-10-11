import React from "react";

export type ImageProps = {
    className: string,
    src: string
}

const Image = (props: ImageProps) => {
    const {className, src} = props;
    return <img className={className} src={src} alt=""/>;
}

export default Image;