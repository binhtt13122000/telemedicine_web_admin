import React from "react";

import { NavLink } from "react-router-dom";

import { IRoute } from "../../common/types";
import routes from "../../routes";

import { Divider, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";

const CustomSidebar: React.FC = () => {
    return (
        <React.Fragment>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Telemedicine
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {routes.map((route: IRoute) => (
                    <NavLink exact to={route.path} key={route.key}>
                        <ListItem button>
                            <ListItemText primary={route.name} />
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </React.Fragment>
    );
};

export default CustomSidebar;
