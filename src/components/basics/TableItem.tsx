import React from "react";

export type TableItemProps = {
    head?: boolean,
    className?: string,
    children?: JSX.Element | JSX.Element[] | string
}

const TableItem = (props: TableItemProps) => {
    const {head, className, children} = props;
    return head ? <th className={className}>{children}</th> : <td className={className}>{children}</td>;
}

export default TableItem;