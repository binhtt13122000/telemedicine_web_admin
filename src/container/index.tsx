import React, { useEffect, useState } from "react";

import axios from "axios";
import MaterialTable from "material-table";

function SymptomPage() {
    const columns = [
        { title: "ID", field: "id" },
        { title: "Symptom code", field: "symptomCode" },
        { title: "Name", field: "name" },
        { title: "Description", field: "description" },
    ];

    const [datatable, setDatatable] = useState([]);
    const [currentPage, setCurrentPage] = useState();
    const [totalItem, setTotalItem] = useState(0);

    useEffect(() => {
        const axiosGet = async () => {
            const response = await axios(
                "http://52.221.193.237/api/v1/symptoms?code=1&limit=20&offset=1"
            );
            console.log(response.data.content);
            console.log(response.data.currentPage);
            setDatatable(response.data.content);
            setCurrentPage(response.data.currentPage);
            setTotalItem(response.data.totalCount);
        };
        axiosGet();
    }, []);

    return (
        <div>
            <MaterialTable
                title="Manage Symptom"
                columns={columns}
                data={datatable}
                actions={[
                    {
                        icon: "add",
                        tooltip: "Add User",
                        isFreeAction: true,
                        onClick: (event) => alert("You want to add a new row"),
                    },
                    (rowData) => ({
                        icon: "delete",
                        tooltip: "Delete User",
                        onClick: (event, rowData) => alert("You saved " + rowData),
                    }),
                ]}
                options={{
                    actionsColumnIndex: -1,
                }}
                onChangePage={() => {
                    setCurrentPage;
                }}
            />
        </div>
    );
}

export default SymptomPage;
