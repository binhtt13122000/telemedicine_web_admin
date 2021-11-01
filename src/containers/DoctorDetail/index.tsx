import React, { useCallback, useEffect, useState } from "react";

import Moment from "moment";
import moment from "moment";
import { useHistory, useParams } from "react-router";
import axios from "src/axios";

import { ConfirmModal } from "src/components/ConfirmModal";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Account } from "../AccountManagement/models/Account.model";
import CertificateCarosuel from "./component/CertificateCarosuel";
import Hospital from "./component/Hospital";
import Major from "./component/Major";
import { Doctors } from "./models/Doctor.model";

import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { Chip, Stack, Rating, Tooltip } from "@mui/material";
import {
    Button,
    Avatar,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText,
    List,
} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { BoxProps } from "@mui/system";

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
const DoctorDetails: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const [account, setAccount] = useState<Account>();
    const [doctor, setDoctor] = useState<Doctors>();
    const [verifyDoctor, setVerifyDoctor] = useState<boolean>(false);
    const [lockAccount, setLockAccount] = useState<boolean>(false);
    const showSnackbar = useSnackbar();
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
    const [isOpenLockConfirmModal, setIsOpenLockConfirmModal] = useState<boolean>(false);
    const [, setOpen] = React.useState(false);

    const handleClickVerify = () => {
        setIsOpenConfirmModal(true);
    };

    const handleClickLock = () => {
        setIsOpenLockConfirmModal(true);
    };

    const params = useParams<{ email: string }>();
    const emailAcc = params.email;

    let gender = "Mr. ";
    if (!loading && !account?.isMale) {
        gender = "Mrs. ";
    }
    const getAccountByEmail = useCallback(
        async (emailAcc) => {
            setLoading(true);
            try {
                const response = await axios.get(`/accounts/${emailAcc}?search-type=Email`);
                // eslint-disable-next-line no-console
                console.log(response);
                if (response.status === 200) {
                    const accountRes: Account = response.data;
                    setAccount(accountRes);
                    const res = await axios.get(`/doctors/${emailAcc}?search-type=Email`);
                    if (res.status === 200) {
                        setDoctor(res.data);
                    }
                }
            } catch (_error) {
                history.push("/not-found");
            } finally {
                setLoading(false);
            }
        },
        [history]
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseVerifyConfirmModal = async (
        e: React.MouseEvent<HTMLButtonElement | globalThis.MouseEvent, globalThis.MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => {
        if (action === "CONFIRM") {
            try {
                const response = await axios.get(`/doctors/${emailAcc}?search-type=Email`);
                if (response.status === 200) {
                    const accountRes: Doctors = response.data;
                    const res = await axios.patch(`/doctors/${accountRes?.id}?mode=ACCEPT`);
                    if (res.status === 200) {
                        setVerifyDoctor(!verifyDoctor);
                        showSnackbar({
                            children: "Cập nhật trạng thái tài khoản thành công",
                            variant: "filled",
                            severity: "success",
                        });
                        window.location.reload();
                    }
                }
            } catch (error) {
                showSnackbar({
                    children: "Cập nhật trạng thái tài khoản thất bại",
                    variant: "filled",
                    severity: "error",
                });
            }
        }
        setIsOpenConfirmModal(false);
    };
    const handleLockConfirmModal = async (
        e: React.MouseEvent<HTMLButtonElement | globalThis.MouseEvent, globalThis.MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => {
        if (action === "CONFIRM") {
            try {
                const response = await axios.get(`/doctors/${emailAcc}?search-type=Email`);
                // const response = await axios.patch(`${API_ROOT_URL}/doctors/1`);
                if (response.status === 200) {
                    const accountRes: Doctors = response.data;
                    const res = await axios.patch(`/doctors/${accountRes?.id}`);
                    if (res.status === 200) {
                        setLockAccount(!lockAccount);
                        showSnackbar({
                            children: "Cập nhật trạng thái tài khoản thành công",
                            variant: "filled",
                            severity: "success",
                        });
                    }
                }
            } catch (error) {
                showSnackbar({
                    children: "Cập nhật trạng thái tài khoản thất bại",
                    variant: "filled",
                    severity: "error",
                });
            }
        }
        setIsOpenConfirmModal(false);
    };

    useEffect(() => {
        getAccountByEmail(emailAcc);
    }, [emailAcc, getAccountByEmail]);

    const profile = (
        <Card>
            <CardContent sx={{ height: 450 }}>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Avatar
                        src={account?.avatar}
                        sx={{
                            height: 100,
                            width: 100,
                        }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography color="textPrimary" gutterBottom variant="h5">
                            {`${gender} ${account?.firstName} ${account?.lastName}`}
                        </Typography>
                    </Box>
                    <Rating name="read-only" value={doctor?.rating || 0} readOnly />
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <CakeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={Moment(account?.dob).format("DD/MM/YYYY")} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PhoneOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={account?.phone} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EmailOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={account?.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={`${account?.streetAddress}, ${account?.locality}, ${account?.city}`}
                            />
                        </ListItem>
                    </List>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                {doctor?.isVerify ? (
                    <React.Fragment>
                        <Button
                            color={lockAccount ? "success" : "error"}
                            fullWidth
                            variant="text"
                            onClick={handleClickLock}
                        >
                            {account?.active ? "Khóa tài khoản" : "Kích hoạt tài khoản"}
                        </Button>
                        <Button
                            onClick={() => history.push("/slots/" + doctor.id)}
                            color={"warning"}
                            fullWidth
                            variant="text"
                        >
                            Lịch hoạt động
                        </Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Button
                            color={"success"}
                            fullWidth
                            variant="text"
                            onClick={handleClickVerify}
                        >
                            XÁC THỰC BÁC SĨ
                        </Button>
                        <Button
                            color={"error"}
                            fullWidth
                            variant="text"
                            onClick={handleClickVerify}
                        >
                            TỪ CHỐI XÁC THỰC
                        </Button>
                    </React.Fragment>
                )}
            </CardActions>
        </Card>
    );

    const Praticing = (
        <Card sx={{ minHeight: "100%", borderRadius: 5 }}>
            <Box sx={{ ml: 2, display: "flex" }}>
                <Box>
                    <Typography variant="h6" component="div">
                        Hồ sơ
                        {doctor?.isAcitve ? (
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
                    <Box sx={{ display: "block" }}>
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
                            <Typography variant="body2" component="div" sx={{ fontWeight: "bold" }}>
                                Mã chứng nhận:
                            </Typography>
                            <Typography variant="body2" component="h5">
                                {doctor?.certificateCode}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body2" component="div" sx={{ fontWeight: "bold" }}>
                                Nơi cấp chứng nhận:
                            </Typography>

                            <Typography variant="body2" component="h5">
                                {doctor?.placeOfCertificate}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body2" component="div" sx={{ fontWeight: "bold" }}>
                                Cấp ngày:
                            </Typography>

                            <Typography variant="body2" component="h5">
                                {moment(doctor?.dateOfCertificate).format("DD/MM/YYYY")}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body2" component="div" sx={{ fontWeight: "bold" }}>
                                Phạm vi:
                            </Typography>

                            <Typography variant="body2" component="h5">
                                {doctor?.scopeOfPractice}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body2" component="div" sx={{ fontWeight: "bold" }}>
                                Mô tả:
                            </Typography>

                            <Typography variant="body2" component="h5">
                                {doctor?.description}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body2" component="div" sx={{ fontWeight: "bold" }}>
                                Số bệnh nhân đã tư vấn:
                            </Typography>

                            <Typography variant="body2" component="h5">
                                {doctor?.numberOfConsultants}
                            </Typography>
                        </Stack>

                        <Box sx={{ mt: 1 }} />

                        <Stack direction="row" spacing={1}>
                            <Typography variant="body2" component="h5">
                                {doctor?.isVerify ? (
                                    <Chip label="Đã xác thực" variant="outlined" color="success" />
                                ) : (
                                    <Chip label="Chưa xác thực" variant="outlined" color="error" />
                                )}
                            </Typography>
                        </Stack>
                    </Box>
                </Item>
            </Box>
        </Card>
    );

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <React.Fragment>
            <ConfirmModal
                open={isOpenConfirmModal}
                message="Bạn có muốn thực hiện thay đổi?"
                handleClose={handleCloseVerifyConfirmModal}
            />
            <ConfirmModal
                open={isOpenLockConfirmModal}
                message="Bạn có muốn thực hiện thay đổi?"
                handleClose={handleLockConfirmModal}
            />
            <Box
                sx={{
                    minHeight: "100%",
                    py: 3,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            {profile}
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            <CertificateCarosuel doctors={doctor} />
                            {/* {CertificateCarosuel} */}
                        </Grid>
                    </Grid>
                </Container>
                <Box sx={{ mb: 2 }} />
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            {Praticing}
                        </Grid>

                        <Grid item lg={4} md={6} xs={12}>
                            <Major doctors={doctor} />
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                            <Hospital doctors={doctor} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default DoctorDetails;
