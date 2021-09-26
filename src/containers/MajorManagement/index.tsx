import MaterialTable, { Localization } from "material-table";

import { TablePagination } from "@material-ui/core";

import useMajor from "./hooks/useMajor";

const MajorManagement: React.FC = () => {
    const {
        loading,
        columns,
        majors,
        pagination,
        onUpdate,
        onAdd,
        onDelete,
        handleChangePage,
        handleChangeRowsPerPage,
    } = useMajor();
    return (
        <MaterialTable
            isLoading={loading}
            columns={columns}
            data={majors}
            editable={{
                onRowUpdate: (newData, oldData) => onUpdate(newData, oldData?.id),
                onRowAdd: (newData) => onAdd(newData),
                onRowDelete: (oldData) => onDelete(oldData.id),
            }}
            title="Major Management"
            localization={localization}
            components={{
                Pagination: function TblPaginator(props) {
                    return (
                        <TablePagination
                            {...props}
                            rowsPerPageOptions={[5, 10, 20, 30]}
                            count={pagination.count}
                            onChangePage={(e, page: number) => handleChangePage(page)}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            page={pagination.page - 1}
                            rowsPerPage={pagination.pageSize}
                        />
                    );
                },
            }}
            options={{
                actionsColumnIndex: -1,
                emptyRowsWhenPaging: false,
                showEmptyDataSourceMessage: true,
                filtering: true,
            }}
        />
    );
};

const localization: Localization = {
    body: {
        emptyDataSourceMessage: "No records to display",
        filterRow: {
            filterTooltip: "Filter",
        },
    },
};

export default MajorManagement;
