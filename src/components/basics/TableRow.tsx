import React from "react";

type TableRowProps = {
    className?: string,
    children?: JSX.Element | JSX.Element[]
}

const TableRow = (props: TableRowProps) => {
    return <tr className={props.className}>{props.children}</tr>;
}

export default TableRow;