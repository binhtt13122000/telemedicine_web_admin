import React, { useCallback, useEffect, useState } from "react";

import Moment from "moment";
import moment from "moment";
import { useHistory, useParams } from "react-router";
import axios from "src/axios";

import { Box } from "@material-ui/core";
import { ConfirmModal } from "src/components/ConfirmModal";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Account } from "../AccountManagement/models/Account.model";
import { Doctors } from "./models/Doctor.model";

import BlockIcon from "@mui/icons-material/Block";
// import { Email } from "@mui/icons-material";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
    Accordion,
    Chip,
    Stack,
    Rating,
    Tooltip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
} from "@mui/material";
import {
    Button,
    Avatar,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    List,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
    const [expanded, setExpanded] = React.useState<string | false>("panel1");
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const [account, setAccount] = useState<Account>();
    const [doctor, setDoctor] = useState<Doctors>();
    const [verifyDoctor, setVerifyDoctor] = useState<boolean>(false);
    const [lockAccount, setLockAccount] = useState<boolean>(false);
    const showSnackbar = useSnackbar();
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
    const [isOpenLockConfirmModal, setIsOpenLockConfirmModal] = useState<boolean>(false);
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseVerifyConfirmModal = async (
        e: React.MouseEvent<HTMLButtonElement | globalThis.MouseEvent, globalThis.MouseEvent>,
        action: "CONFIRM" | "CANCEL"
    ) => {
        if (action === "CONFIRM") {
            try {
                const response = await axios.get(`/doctors/${emailAcc}?search-type=Email`);
                // const response = await axios.patch(`${API_ROOT_URL}/doctors/1`);
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
        // getAccountById(accountId);
        getAccountByEmail(emailAcc);
        // verifyAccount(accountId);
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
                                {/* <Chip icon={<PersonIcon />} label={data?.numberOfConsultants} /> */}
                            </Typography>
                        </Stack>

                        <Box sx={{ mt: 1 }} />

                        <Stack direction="row" spacing={1}>
                            {/* <Typography
                            variant="body2"
                            component="div"
                            sx={{ fontWeight: "bold" }}
                        >
                            Tình trạng:
                        </Typography> */}

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

    const Major = (
        <Card sx={{ height: "100%", borderRadius: 5 }}>
            <Box sx={{ ml: 2 }}>
                <Typography variant="h6" component="div">
                    Chuyên khoa
                </Typography>
            </Box>
            <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: 300,
                        "& ul": { padding: 0 },
                    }}
                >
                    {doctor?.majorDoctors?.map((item) => (
                        <>
                            <ListItem key={item?.id}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        borderRadius: 5,
                                        bgcolor: "#fafafa",
                                    }}
                                >
                                    <Box sx={{ display: "block" }}>
                                        <Typography variant="h6" component="h5">
                                            {item?.major?.name}
                                            {item?.major?.name ? (
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
                                        <Typography variant="body2" component="h5">
                                            Mô tả: Chuyên chữa trị các bệnh nội ngoại tiết{" "}
                                            {item?.major?.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItem>
                        </>
                    ))}
                </List>
                <Box sx={{ mb: 2 }} />
            </Box>
        </Card>
    );

    const Hospital = (
        <Card sx={{ minHeight: "100%", borderRadius: 5 }}>
            <Box sx={{ ml: 2 }}>
                <Typography variant="h6" component="div">
                    Bệnh viện
                </Typography>
            </Box>
            <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: 300,
                        "& ul": { padding: 0 },
                    }}
                >
                    {doctor?.hospitalDoctors?.map((item) => (
                        <ListItem key={item?.id}>
                            <Box sx={{ display: "flex", borderRadius: 5, bgcolor: "#fafafa" }}>
                                <Box sx={{ display: "block" }}>
                                    <Typography variant="h6" component="h5">
                                        {item?.hospital?.name}
                                        {item?.hospital?.name ? (
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
                                    <Typography variant="body2" component="h5">
                                        Địa chỉ: {item?.hospital?.address}
                                    </Typography>
                                    <Typography variant="body2" component="h5">
                                        Mô tả: {item?.hospital?.description}
                                    </Typography>

                                    <Box sx={{ mt: 1 }} />
                                    <Typography variant="body2" component="h5">
                                        Tình trạng:{" "}
                                        {item?.isWorking ? (
                                            <Chip
                                                label="Đang công tác"
                                                variant="outlined"
                                                color="success"
                                            />
                                        ) : (
                                            <Chip
                                                label="Nghỉ công tác"
                                                variant="outlined"
                                                color="error"
                                            />
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ mb: 2 }} />
            </Box>
        </Card>
    );

    const Certificate = (
        <Card sx={{ height: 400, borderRadius: 5 }}>
            <Box sx={{ ml: 2 }}>
                <Typography variant="h6" component="div">
                    Chứng chỉ
                </Typography>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                {doctor?.certificationDoctors?.map((x) => {
                    return (
                        <>
                            <Item key={x?.id}>
                                <Box sx={{ display: "flex" }}>
                                    <img
                                        src={x?.evidence}
                                        loading="lazy"
                                        width="70%"
                                        height="60%"
                                    />
                                </Box>

                                <Typography variant="h6" component="h5">
                                    {x?.certification?.name}
                                </Typography>

                                <Box sx={{ display: "flex", fontWeight: "200" }}>
                                    <Typography variant="body2" paragraph>
                                        Cấp ngày {moment(x?.dateOfIssue).format("DD/MM/YYYY")}
                                    </Typography>
                                    <Box sx={{ ml: 21 }}>
                                        {x?.isActive ? (
                                            <IconButton>
                                                <VerifiedIcon color="success" />
                                            </IconButton>
                                        ) : (
                                            <IconButton>
                                                <BlockIcon color="error" />
                                            </IconButton>
                                        )}
                                    </Box>
                                </Box>
                            </Item>
                        </>
                    );
                })}
            </Box>
        </Card>
    );
    const doctorProfile = (
        <form autoComplete="off" noValidate>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>Thông tin hành nghề</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <Typography color="textPrimary" gutterBottom>
                                Mã chứng chỉ: {doctor?.certificateCode}
                            </Typography>
                            <Typography color="textPrimary" gutterBottom>
                                Chứng chỉ hành nghề:
                                <Link variant="body2" underline="none" onClick={handleClickOpen}>
                                    View
                                </Link>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Chứng chỉ</DialogTitle>
                                    <DialogContent>
                                        <img
                                            width="100%"
                                            height="100%"
                                            src={doctor?.practisingCertificate}
                                            loading="lazy"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </Typography>
                            <Typography color="textPrimary" gutterBottom>
                                Mô tả: {doctor?.description}
                            </Typography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography color="textPrimary" gutterBottom>
                                Nơi cấp chứng chỉ: {doctor?.placeOfCertificate}
                            </Typography>
                            <Typography color="textPrimary" gutterBottom>
                                Số lượng người tư vấn: {doctor?.numberOfConsultants}
                            </Typography>
                            <Typography color="textPrimary" gutterBottom>
                                Phạm vi thực hành: {doctor?.scopeOfPractice}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>Chứng chỉ</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Chuyên khoa</TableCell>
                                    <TableCell align="left">Bằng chứng</TableCell>
                                    <TableCell align="left">Ngày cấp</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doctor?.certificationDoctors?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">
                                            {item.certification?.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            <img width="50%" height="130" src={item.evidence} />
                                        </TableCell>
                                        <TableCell align="left">
                                            {Moment(item.dateOfIssue).format("d MMM yy")}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>Chuyên khoa</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Mã chuyên khoa</TableCell>
                                    <TableCell align="left">Tên chuyên khoa</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doctor?.majorDoctors?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">{item.majorId}</TableCell>
                                        <TableCell align="left">{item.major?.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>Bệnh viện công tác</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Mã bệnh viện bệnh viện</TableCell>
                                    <TableCell align="left">Tên bệnh viện</TableCell>
                                    <TableCell align="left">Tình trạng làm việc</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doctor?.hospitalDoctors?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">
                                            {item.hospital?.hospitalCode}
                                        </TableCell>
                                        <TableCell align="left">{item.hospital?.name}</TableCell>
                                        <TableCell align="left">{item.isWorking}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </form>
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
                            {/* <AccountProfileDetails /> */}
                            <br />
                            {Certificate}
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
                            {Major}
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                            {Hospital}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default DoctorDetails;
