import React from "react";

export interface IRoute {
    name: string;
    key: string;
    path: string;
    component: React.FC;
}
