import React from "react";

import moment from "moment";

import { Doctors } from "../models/Doctor.model";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Card, IconButton, Typography, Tooltip, Stack, Link, Chip } from "@mui/material";
import { Box } from "@mui/system";
import { BoxProps } from "@mui/system";

export interface IPracticing {
    doctors?: Doctors;
}
function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: "#fafafa",
                color: "black",
                p: 1,
                m: 1,
                borderRadius: 5,
                textAlign: "left",
                fontSize: 19,
                fontWeight: "700",
                boxShadow: 5,
                ...sx,
            }}
            {...other}
        />
    );
}
const Practicing: React.FC<IPracticing> = (props: IPracticing) => {
    const { doctors } = props;
    const [, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <React.Fragment>
            <Card sx={{ minHeight: "100%", borderRadius: 5 }}>
                <Box sx={{ ml: 2, display: "flex" }}>
                    <Box>
                        <Typography variant="h6" component="div">
                            Hồ sơ
                            {doctors?.isAcitve ? (
                                <Tooltip title="Còn hoạt động">
                                    <IconButton>
                                        <CheckCircleOutlineIcon color="success" />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Không hoạt động">
                                    <IconButton>
                                        <CheckCircleOutlineIcon color="error" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 27 }}>
                        <Typography variant="h6" component="h5"></Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <Item>
                        <Box sx={{ display: "block", p: 2 }}>
                            <Box sx={{ display: "flex" }}>
                                <Stack direction="row" spacing={1}>
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Chứng chỉ hành nghề:
                                    </Typography>

                                    <Typography variant="body2" component="h5">
                                        <Link
                                            variant="body2"
                                            underline="none"
                                            onClick={handleClickOpen}
                                        >
                                            {" "}
                                            View
                                        </Link>
                                    </Typography>
                                </Stack>
                            </Box>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Mã chứng nhận:
                                </Typography>
                                <Typography variant="body2" component="h5">
                                    {doctors?.certificateCode}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Nơi cấp chứng nhận:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {doctors?.placeOfCertificate}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Cấp ngày:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {moment(doctors?.dateOfCertificate).format("DD/MM/YYYY")}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Phạm vi:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {doctors?.scopeOfPractice}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Mô tả:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {doctors?.description}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Số bệnh nhân đã tư vấn:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {doctors?.numberOfConsultants}
                                </Typography>
                            </Stack>

                            <Box sx={{ mt: 1 }} />

                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2" component="h5">
                                    {doctors?.isVerify ? (
                                        <Chip
                                            label="Đã xác thực"
                                            variant="outlined"
                                            color="success"
                                        />
                                    ) : (
                                        <Chip
                                            label="Chưa xác thực"
                                            variant="outlined"
                                            color="error"
                                        />
                                    )}
                                </Typography>
                            </Stack>
                        </Box>
                    </Item>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default Practicing;
