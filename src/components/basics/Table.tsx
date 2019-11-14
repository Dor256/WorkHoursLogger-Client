import React from "react";

export type TableProps = {
    className?: string,
    children?: JSX.Element | JSX.Element[]
}

const Table = (props: TableProps) => {
    const { className, children} = props;
    return <table className={className}>{children}</table>;
}

export default Table;