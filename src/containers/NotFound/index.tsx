import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const NotFound: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography variant="h3">404</Typography>
            <Typography variant="h5">Page not found</Typography>
        </Box>
    );
};

export default NotFound;
