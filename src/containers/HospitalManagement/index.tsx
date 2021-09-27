import React, { useState } from "react";

import MaterialTable from "material-table";

// import CustomSidebar from "../../components/CustomSidebar";
import { Hospital } from "./models/Hospital.model";
import HospitalService from "./services/Hospital.service";

// import { Divider, Grid, Toolbar } from "@mui/material";

const Hospitals: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const columns = [
        { title: "Mã", field: "hospitalCode", filtering: false },
        { title: "Tên bệnh viện", field: "name" },
        { title: "Địa chỉ", field: "address", filtering: false },
        { title: "Thông tin chi tiết", field: "description", filtering: false },
    ];

    // const table = (
    //     <MaterialTable
    //         title="Hospitals List"
    //         columns={columns}
    //         data={(query) =>
    //             new Promise((resolve) => {
    //                 let searchValue = "";
    //                 let param = "";
    //                 if (query.filters.length > 0) {
    //                     searchValue = query.filters[0].value.trim();
    //                     if (searchValue !== "") {
    //                         param = `&name=${searchValue}`;
    //                     }
    //                 }
    //                 HospitalService.getAll(query.pageSize, query.page + 1, param).then(
    //                     (response) => {
    //                         resolve({
    //                             data: response.data.content,
    //                             page: response.data.currentPage - 1,
    //                             totalCount: response.data.totalCount,
    //                         });
    //                     }
    //                 );
    //             })
    //         }
    //         isLoading={loading}
    //         editable={{
    //             onRowAdd: (newHospital: Hospital) => onAdd(newHospital),
    //             onRowUpdate: (newHospital: Hospital) => onUpdate(newHospital),
    //             onRowDelete: (hospital: Hospital) => onDelete(hospital),
    //         }}
    //         options={{ filtering: true }}
    //     ></MaterialTable>
    // );

    const onAdd = async (newHospital: Hospital) => {
        setLoading(true);
        await HospitalService.create(newHospital)
            .then(() => {
                // initData()
            })
            .catch(() => {
                // show error here
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onUpdate = async (newHospital: Hospital) => {
        setLoading(true);
        await HospitalService.update(newHospital)
            .then(() => {
                // initData();
            })
            .catch(() => {
                // show error here
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onDelete = async (hospital: Hospital) => {
        setLoading(true);
        await HospitalService.delete(hospital.id)
            .then(() => {
                // initData();
            })
            .catch(() => {
                // show error here
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        // <React.Fragment>
        //     <Grid container spacing={2}>
        //         <Grid item xs={3}>
        //             <CustomSidebar />
        //         </Grid>
        //         <Grid item xs={8}>
        //             <Toolbar />
        //             <Divider />
        //             {table}
        //         </Grid>
        //     </Grid>
        <MaterialTable
            title="Danh sách Bệnh viện"
            columns={columns}
            data={(query) =>
                new Promise((resolve) => {
                    let searchValue = "";
                    let param = "";
                    if (query.filters.length > 0) {
                        searchValue = query.filters[0].value.trim();
                        if (searchValue !== "") {
                            param = `&name=${searchValue}`;
                        }
                    }
                    HospitalService.getAll(query.pageSize, query.page + 1, param).then(
                        (response) => {
                            resolve({
                                data: response.data.content,
                                page: response.data.currentPage - 1,
                                totalCount: response.data.totalCount,
                            });
                        }
                    );
                })
            }
            isLoading={loading}
            editable={{
                onRowAdd: (newHospital: Hospital) => onAdd(newHospital),
                onRowUpdate: (newHospital: Hospital) => onUpdate(newHospital),
                onRowDelete: (hospital: Hospital) => onDelete(hospital),
            }}
            options={{ filtering: true }}
        ></MaterialTable>
        // </React.Fragment>
    );
};

export default Hospitals;
