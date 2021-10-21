import * as React from "react";

import axios from "src/axios";
import { onMessageListener } from "src/config/firebase";

import AppBarWithDrawer from "src/components/AppBar";
import DrawerBase from "src/components/Drawer";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import { CssBaseline, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const drawerWidth = 250;

const Layout: React.FC<{ children?: React.ReactNode }> = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [countOfUnread, setCountOfUnread] = React.useState(0);
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const showSnackBar = useSnackbar();
    const userId = LocalStorageUtil.getItem("id_app");

    React.useEffect(() => {
        const getUnread = async () => {
            const response = await axios.get<{ countOfUnRead: number }>(
                `/notifications/users/${userId}`
            );
            if (response.status === 200) {
                setCountOfUnread(response.data.countOfUnRead);
            }
        };
        getUnread();
    }, [userId]);

    const clearUnread = () => {
        setCountOfUnread(0);
    };
    onMessageListener()
        .then((payload) => {
            // eslint-disable-next-line no-console
            console.log(payload);
            if (payload.notification) {
                let title;
                switch (payload.notification.title) {
                    case undefined:
                        break;
                    case "1":
                        title = "Có một tài khoản mới cần xác thực";
                        break;
                    default:
                        break;
                }
                showSnackBar(
                    {
                        variant: "filled",
                        color: "success",
                        children: (
                            <React.Fragment>
                                <Typography variant="h6" align="left">
                                    {title}
                                </Typography>
                                <Typography align="left">
                                    {payload.notification?.body?.split("-")[0] || ""}
                                </Typography>
                            </React.Fragment>
                        ),
                    },
                    {
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right",
                        },
                    }
                );
                setCountOfUnread((prev) => {
                    return prev + 1;
                });
            }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log("failed: ", err));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBarWithDrawer
                countOfUnread={countOfUnread}
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
                clearUnread={clearUnread}
            ></AppBarWithDrawer>
            <DrawerBase
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
