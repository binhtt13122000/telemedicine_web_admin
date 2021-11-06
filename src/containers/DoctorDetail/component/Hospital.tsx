import React from "react";

import { Doctors } from "../models/Doctor.model";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Card, IconButton, List, ListItem, Typography, Tooltip, Chip } from "@mui/material";
import { Box } from "@mui/system";

export interface IHospitalForm {
    doctors?: Doctors;
}

const Hospital: React.FC<IHospitalForm> = (props: IHospitalForm) => {
    const { doctors } = props;
    return (
        <React.Fragment>
            <Card sx={{ height: "100%", borderRadius: 5 }}>
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
                            maxHeight: 450,
                            "& ul": { padding: 0 },
                        }}
                    >
                        {doctors?.hospitalDoctors.length === 0 ? (
                            <Typography component="div" align="center">
                                <Box sx={{ p: 1, fontSize: 18 }}>Chưa có dữ liệu</Box>
                            </Typography>
                        ) : (
                            <React.Fragment>
                                {doctors?.hospitalDoctors?.map((item) => (
                                    <ListItem key={item?.id}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                borderRadius: 5,
                                                bgcolor: "#fafafa",
                                                p: 2,
                                            }}
                                        >
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
                            </React.Fragment>
                        )}
                    </List>
                    <Box sx={{ mb: 2 }} />
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default Hospital;
