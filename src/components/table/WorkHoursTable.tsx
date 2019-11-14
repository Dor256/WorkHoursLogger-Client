import React from "react";
import WorkTableHead from "./WorkTableHead";
import WorkTableBody from "./WorkTableBody";
import Table from "../basics/Table";
import { WorkLoggerEntry } from "../App";
import "./WorkHoursTable.scss";
import LoadingSpinner from "../LoadingSpinner";

type WorkHoursTableProps = {
    onShowTable(): Promise<WorkLoggerEntry[] | undefined>
}

type WorkHoursTableState = {
    workEntries?: WorkLoggerEntry[]
}

class WorkHoursTable extends React.Component<WorkHoursTableProps, WorkHoursTableState> {
    state: WorkHoursTableState = { workEntries: undefined };

    async componentDidMount() {
        const response = await this.props.onShowTable()
        this.setState({ workEntries: response });
    }

    render() {
        const {workEntries} = this.state;
        if(workEntries) {
            return (
                <Table className="work-table">
                    <WorkTableHead/>
                    <WorkTableBody workEntries={workEntries}/>
                </Table>
            );
        }
        return <LoadingSpinner/>;
    }
}

export default WorkHoursTable;