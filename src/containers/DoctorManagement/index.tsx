import React from "react";

import { API_ROOT_URL } from "src/configurations";

import CRUDTable from "src/components/CRUDTable";
import { IColumn } from "src/components/CRUDTable/Models";

import { Doctor } from "../PatientManagement/models/Doctor.model";
import { DoctorUpdate } from "./models/DoctorUpdate.model";

// import { DoctorUpdate } from "./models/DoctorUpdate.model";
import { Avatar, Rating, Tab, Tabs, Typography, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

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

const rows: DoctorUpdate[] = [];

const Doctors: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (newValue == 3) {
            loadData(1, 5);
        }
    };

    const handleClick = () => {};

    const loadData = async (offset: number, limit: number) => {
        try {
            const response = await fetch(
                `${API_ROOT_URL}/doctors?is-update=true&page-offset=${offset}&limit=${limit}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${LocalStorageUtil.getToken()}`,
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();

                // eslint-disable-next-line no-console
                console.log("SSSSSS: " + JSON.stringify(data, null, 2));
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        } finally {
        }
    };

    return (
        <React.Fragment>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Bác sĩ đã xác nhận" />
                        <Tab label="Bác sĩ chưa xác nhận" />
                        <Tab label="Bác sĩ đã từ chối" />
                        <Tab label="Yêu cầu cập nhật" />
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
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell align="right">Ảnh</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Tên</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            {rows.length > 0 ? (
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.avatar}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    color="success"
                                                    fullWidth
                                                    variant="text"
                                                    onClick={handleClick}
                                                >
                                                    Đồng ý
                                                </Button>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    color="error"
                                                    fullWidth
                                                    variant="text"
                                                    onClick={handleClick}
                                                >
                                                    Từ chối
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : null}
                        </Table>
                    </TableContainer>
                </TabPanel>
            </Box>
        </React.Fragment>
    );
};

export default Doctors;
