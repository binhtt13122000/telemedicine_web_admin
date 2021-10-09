import { useState } from "react";

import { HealthCheckDiseases } from "../models/HealthCheckDetail.model";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";

export interface IHealthCheckDisease {
    healthCheckDisease: HealthCheckDiseases[];
}

const HealthCheckDisease: React.FC<IHealthCheckDisease> = (props: IHealthCheckDisease) => {
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <form autoComplete="off" noValidate>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>Thông tin dịch bệnh</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Tên dịch bệnh</TableCell>
                                    <TableCell align="left">Nhóm dịch bệnh</TableCell>
                                    <TableCell align="left">Mô tả</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props?.healthCheckDisease?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">{item.disease?.name}</TableCell>
                                        <TableCell align="left">
                                            {item.disease?.diseaseGroup?.groupName}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.disease?.description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </form>
    );
};

export default HealthCheckDisease;
