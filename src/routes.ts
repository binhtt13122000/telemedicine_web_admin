import { IRoute } from "./common/types";
import Hospitals from "./containers/HospitalManagement";

const routes: IRoute[] = [
    {
        name: "Trang chủ",
        key: "dashboard",
        path: "/dashboard",
        component: Hospitals,
    },
    {
        name: "Danh sách Bác sĩ",
        key: "doctors",
        path: "/doctors",
        component: Hospitals,
    },
    {
        name: "Danh sách Bệnh nhân",
        key: "patients",
        path: "/patients",
        component: Hospitals,
    },
    {
        name: "Danh sách Bệnh viện",
        key: "hospitals",
        path: "/hospitals",
        component: Hospitals,
    },
    {
        name: "Danh sách Triệu chứng",
        key: "symptoms",
        path: "/symptoms",
        component: Hospitals,
    },
    {
        name: "Danh sách các loại thuốc",
        key: "drugTypes",
        path: "/drug-types",
        component: Hospitals,
    },
];

export default routes;
