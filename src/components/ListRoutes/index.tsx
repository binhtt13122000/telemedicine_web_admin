import React, { useState, useEffect, useCallback } from "react";

import { useHistory } from "react-router";
import axios from "src/axios";

import RoutesCollapse from "./components/RoutesCollapse";

import { routes, routesControlApp } from "./data";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    ListItemIcon,
    ListItem,
    Divider,
    Toolbar,
    ListItemText,
    List,
    IconButton,
} from "@mui/material";

export type ChildrenType = {
    fatherIndex: number;
    selectedChildIndex: number;
    isOpen: boolean;
};

const ListRoutes = () => {
    const [count, setCount] = useState(0);
    const itemSelected = sessionStorage.getItem("itemSelected");
    const history = useHistory();
    const [openChildren, setOpenChildren] = useState<ChildrenType>(
        itemSelected == null
            ? {
                  fatherIndex: -1,
                  selectedChildIndex: -1,
                  isOpen: false,
              }
            : JSON.parse(itemSelected)
    );

    const countDoctor = useCallback(async () => {
        try {
            const response = await axios.get("/doctors/count?is-verify=-2");
            if (response.status === 200) {
                setCount(response.data);
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        }
    }, []);

    useEffect(() => {
        countDoctor();
    }, [countDoctor]);
    useEffect(() => {
        sessionStorage.setItem("itemSelected", JSON.stringify(openChildren));
    }, [openChildren]);
    const handleListItemClick = (
        index: number,
        path: string | undefined,
        hasChildren: boolean,
        fatherIndex: number
    ) => {
        if (path) {
            history.push(path);
        }
        if (hasChildren) {
            setOpenChildren((prev) => {
                return {
                    ...prev,
                    fatherIndex: fatherIndex,
                    selectedChildIndex: index,
                    isOpen: prev.fatherIndex != fatherIndex ? true : !prev.isOpen,
                };
            });
        } else {
            setOpenChildren((prev) => {
                return {
                    ...prev,
                    selectedChildIndex: index,
                    fatherIndex: fatherIndex,
                    isOpen: true,
                };
            });
        }
    };

    return (
        <React.Fragment>
            <Toolbar />
            <Divider />
            {routes.map((item) => (
                <React.Fragment key={item.name}>
                    <ListItem
                        button
                        key={item.name}
                        onClick={() =>
                            handleListItemClick(item.id, item.path, Boolean(item.children), item.id)
                        }
                        selected={openChildren.fatherIndex === item.id}
                        secondaryAction={
                            item.id === -1 ? (
                                <IconButton
                                    edge="end"
                                    size="small"
                                    color="error"
                                    aria-label="comments"
                                >
                                    {count}
                                </IconButton>
                            ) : null
                        }
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                        {item?.children ? (
                            openChildren.fatherIndex == item.id && openChildren.isOpen ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )
                        ) : null}
                    </ListItem>
                    {item?.children ? (
                        <RoutesCollapse
                            item={item?.children}
                            fatherId={item?.id}
                            handleListItemClick={handleListItemClick}
                            openChildren={openChildren}
                        />
                    ) : null}
                </React.Fragment>
            ))}
            <Divider />
            <List>
                {routesControlApp.map((item) => (
                    <ListItem
                        button
                        key={item.name}
                        selected={openChildren.fatherIndex === item.id}
                        onClick={() =>
                            handleListItemClick(item.id, item.path, Boolean(item.children), item.id)
                        }
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
};

export default ListRoutes;
