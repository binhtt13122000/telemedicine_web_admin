import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "src/config/firebase";
import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Doctor } from "../PatientManagement/models/Doctor.model";
import DoctorService from "./services/Doctor.service";

import {
    Avatar,
    Button,
    Rating,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const normalColumns: IColumn[] = [
    {
        field: "id",
        align: "left",
        title: "STT",
        type: "index",
        disableFilter: true,
        disableSort: true,
        editable: "never",
        index: 1,
        width: "80",
    },
    {
        field: "avatar",
        align: "left",
        title: "Ảnh",
        disableFilter: true,
        disableSort: true,
        index: 2,
        width: "50",
        render: (imgLink: string) => (
            <Avatar sx={{ height: 36, width: 36, borderRadius: "50%" }} src={imgLink} />
        ),
    },
    {
        field: "email",
        align: "left",
        title: "Email",
        index: 3,
        renderLink: (data: Doctor) => {
            return "/doctors/" + data.email;
        },
        width: "90",
    },
    {
        field: "name",
        align: "left",
        title: "Tên bác sĩ",
        index: 4,
        width: "130",
    },
    {
        field: "certificateCode",
        align: "left",
        title: "Mã hành nghề",
        index: 5,
        width: "150",
    },
    {
        field: "scopeOfPractice",
        align: "left",
        title: "Chuyên khoa",
        index: 6,
        width: "190",
    },
    {
        field: "numberOfConsultants",
        align: "left",
        title: "Số người tư vấn",
        index: 7,
        width: "160",
    },
    {
        field: "rating",
        align: "left",
        title: "Đánh giá",
        index: 8,
        width: "90",
        render: (props: number) => {
            return <Rating readOnly value={props || 0} />;
        },
    },
];

const verifyColumns: IColumn[] = [
    {
        field: "id",
        align: "left",
        title: "STT",
        type: "index",
        disableFilter: true,
        disableSort: true,
        editable: "never",
        index: 1,
        width: "80",
    },
    {
        field: "avatar",
        align: "left",
        title: "Ảnh",
        disableFilter: true,
        disableSort: true,
        index: 2,
        width: "50",
        render: (imgLink: string) => (
            <Avatar sx={{ height: 36, width: 36, borderRadius: "50%" }} src={imgLink} />
        ),
    },
    {
        field: "email",
        align: "left",
        title: "Email",
        index: 3,
        renderLink: (data: Doctor) => {
            return "/doctors/" + data.email;
        },
        width: "100",
    },
    {
        field: "name",
        align: "left",
        title: "Tên bác sĩ",
        index: 4,
        width: "120",
    },
    {
        field: "certificateCode",
        align: "left",
        title: "Mã hành nghề",
        index: 5,
        width: "140",
    },
    {
        field: "scopeOfPractice",
        align: "left",
        title: "Chuyên khoa",
        index: 6,
        width: "200",
    },
];
const Doctors: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Bác sĩ đã xác nhận" />
                        <Tab label="Bác sĩ chưa xác nhận" />
                        <Tab label="Bác sĩ đã từ chối" />
                        <Tab label="Yêu cầu chỉnh sửa hồ sơ" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CRUDTable
                        title={"Danh sách bác sĩ đã xác nhận"}
                        enableFilter
                        sort
                        query={`${API_ROOT_URL}/doctors`}
                        initParam={`&is-verify=${
                            window.location.href.includes("verify") ? "-2" : "1"
                        }&`}
                        columns={
                            window.location.href.includes("verify") ? verifyColumns : normalColumns
                        }
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CRUDTable
                        title={"Danh sách bác sĩ chưa xác nhận"}
                        enableFilter
                        sort
                        query={`${API_ROOT_URL}/doctors`}
                        initParam={`&is-verify=${-2}&`}
                        columns={verifyColumns}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CRUDTable
                        title={"Danh sách bác sĩ đã từ chối"}
                        enableFilter
                        sort
                        query={`${API_ROOT_URL}/doctors`}
                        initParam={`&is-verify=${-1}&`}
                        columns={verifyColumns}
                    />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TableConfirmEdit />
                </TabPanel>
            </Box>
        </React.Fragment>
    );
};

const TableConfirmEdit: React.FC = () => {
    const [queryStr, setQuery] = useState<Array<{ email: string; query: any }>>([]);
    useEffect(() => {
        onSnapshot(collection(db, "update"), (doc) => {
            // eslint-disable-next-line no-console
            console.log("Current data: ", doc.docs);
            let list = doc.docs.map((x) => {
                let data = JSON.parse(x.data().model);
                if (data.HospitalDoctors === "undefined") {
                    data.HospitalDoctors = undefined;
                } else {
                    data.HospitalDoctors = JSON.parse(data.HospitalDoctors);
                }
                if (data.MajorDoctors === "undefined") {
                    data.MajorDoctors = undefined;
                } else {
                    data.MajorDoctors = JSON.parse(data.MajorDoctors);
                }
                return {
                    email: x.data().email,
                    query: data,
                };
            });
            // eslint-disable-next-line no-console
            console.log("Current datas: ", list);
            setQuery(list);
        });
    }, []);

    const update = (dataMajorAdd: any) => {
        DoctorService.createMajor(dataMajorAdd);
    };

    const remove = async (email: string) => {
        const q = query(collection(db, "update"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        let id = "";
        querySnapshot.forEach((document) => {
            id = document.id;
        });
        await deleteDoc(doc(db, "update", id));
    };
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Thao tác</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {queryStr.map((x, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <a href={"/doctors/" + x.email}>{x.email}</a>
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Button
                                        variant="contained"
                                        onClick={() => update(x.query)}
                                        color="primary"
                                        sx={{ mr: 3 }}
                                    >
                                        Đồng ý
                                    </Button>
                                    <Button
                                        onClick={() => remove(x.email)}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Từ chối
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default Doctors;
