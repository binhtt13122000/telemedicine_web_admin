import { Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";

export interface IPatientHealthInfo {
    allery?: string;
    backgroundDisease?: string;
}

const PatientHealthInfo: React.FC<IPatientHealthInfo> = (props: IPatientHealthInfo) => {
    return (
        <Card>
            <CardHeader title="Thông tin về sức khỏe" />
            <Divider />
            <CardContent>
                {/* Allery */}
                <Grid container sx={{ display: "flex", flexWrap: "wrap", pb: 1 }}>
                    <Grid item xs={3}>
                        <Typography>Tiền sử dị ứng:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ color: "text.secondary" }}>{props.allery}</Typography>
                    </Grid>
                </Grid>
                {/* Background Disease */}
                <Grid container sx={{ display: "flex", flexWrap: "wrap", pb: 1 }}>
                    <Grid item xs={3}>
                        <Typography>Danh sách bệnh nền:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ color: "text.secondary" }}>
                            {props.backgroundDisease}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PatientHealthInfo;
