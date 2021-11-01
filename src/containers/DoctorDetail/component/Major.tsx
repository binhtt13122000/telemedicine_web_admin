import React from "react";

import { Doctors } from "../models/Doctor.model";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Card, IconButton, List, ListItem, Typography, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

export interface IMajorForm {
    doctors?: Doctors;
}

const Major: React.FC<IMajorForm> = (props: IMajorForm) => {
    const { doctors } = props;
    return (
        <React.Fragment>
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
                        {doctors?.majorDoctors?.map((item) => (
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
        </React.Fragment>
    );
};

export default Major;
