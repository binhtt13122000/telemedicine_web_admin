import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { Column } from "material-table";
import { IPagingSupport } from "src/common/types";

import TextFieldFilter from "src/components/TextFieldFilter";

import { Major } from "../models/Major.model";

const useMajor = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [majors, setMajors] = useState<Major[]>([]);
    const [params, setParams] = useState({
        name: "",
    });
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 5,
        count: 0,
    });
    const columns: Column<Major>[] = [
        {
            filtering: false,
            title: "ID",
            field: "id",
            editable: "never",
        },
        {
            filtering: true,
            title: "Tên chuyên ngành",
            field: "name",
            filterComponent: function FilterComponent() {
                return <TextFieldFilter filter={filter} name="name" value={params["name"]} />;
            },
        },
        {
            filtering: false,
            title: "Mô tả chi tiết",
            field: "description",
        },
    ];

    const loadData = async (offset: number, limit: number) => {
        setLoading(true);
        let paramString = "";
        if (params.name?.length > 0) {
            paramString = `&name=${params.name}`;
        }
        try {
            const response = await fetch(
                `http://52.221.193.237/api/v1/majors?offset=${offset}&limit=${limit}${paramString}`
            );
            const data: IPagingSupport<Major> = await response.json();
            setMajors(data.content);
        } catch (ex) {
            // alert(ex);
        } finally {
            setLoading(false);
        }
    };

    const callbackLoadData = useCallback(async (offset: number, limit: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://52.221.193.237/api/v1/majors?offset=${offset}&limit=${limit}`
            );
            const data: IPagingSupport<Major> = await response.json();
            setMajors(data.content);
            setPagination({
                count: data.totalCount,
                page: data.currentPage,
                pageSize: data.pageSize,
            });
        } catch (ex) {
            // alert(ex);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        callbackLoadData(1, 5);
    }, [callbackLoadData]);

    const onUpdate = async (newData: Major, id?: number) => {
        setLoading(true);
        try {
            const response = await fetch("http://52.221.193.237/api/v1/majors/" + id, {
                body: JSON.stringify(newData),
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            if (response.ok) {
                loadData(pagination.page, pagination.pageSize);
            }
        } catch (ex) {
            alert(ex);
        } finally {
            setLoading(false);
        }
    };

    const onAdd = async (newData: Major) => {
        setLoading(true);
        try {
            const response = await fetch("http://52.221.193.237/api/v1/majors", {
                body: JSON.stringify(newData),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            if (response.ok) {
                const data: IPagingSupport<Major> = await response.json();
                loadData(1, pagination.pageSize);
                setPagination({ ...pagination, page: 1, count: data?.totalCount });
            }
        } catch (ex) {
            // alert(ex);
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async (id: number) => {
        setLoading(true);
        try {
            const response = await fetch("http://52.221.193.237/api/v1/majors" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            if (response.ok) {
                const data: IPagingSupport<Major> = await response.json();
                loadData(1, pagination.pageSize);
                setPagination({ ...pagination, page: 1, count: data?.totalCount });
            }
        } catch (ex) {
            alert(ex);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (page: number) => {
        setPagination({ ...pagination, page: page + 1 });
        loadData(page + 1, pagination.pageSize);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPagination({
            ...pagination,
            pageSize: parseInt(event.target.value, 10),
            page: 1,
        });
        loadData(pagination.page, parseInt(event.target.value, 10));
    };

    const filter = async (term: string, field: string) => {
        setParams({
            name: term,
        });
        const paramsString = `&${field}=${term}`;
        try {
            const response = await fetch(
                `http://52.221.193.237/api/v1/majors?offset=1&limit=${pagination.pageSize}${paramsString}`
            );
            const data: IPagingSupport<Major> = await response.json();
            setMajors(data.content);
            setPagination({
                ...pagination,
                count: data.totalCount,
                page: 1,
            });
        } catch (ex) {
            // alert(ex);
        }
    };
    return {
        loading,
        columns,
        majors,
        pagination,
        onUpdate,
        onAdd,
        onDelete,
        handleChangePage,
        handleChangeRowsPerPage,
    };
};

export default useMajor;
