import React from "react";
import WorkTableRow from "./WorkTableRow";
import TableBody from "../basics/TableBody";
import { WorkLoggerEntry } from "../App";

type WorkTableBodyProps = {
    workEntries: WorkLoggerEntry[]
}

const WorkTableBody = (props: WorkTableBodyProps) => {
    const { workEntries } = props;
    return (
        <TableBody>
            {workEntries.map((entry, index) => <WorkTableRow key={index} workEntry={entry}/>)}
        </TableBody>
    );
}

export default WorkTableBody;