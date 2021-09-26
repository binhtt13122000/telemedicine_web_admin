import { Column } from "material-table";

export interface IPagingSupport<T> {
    totalCount: number;
    pageSize: number;
    totalPage: number;
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    content: T[];
}

export interface ColumnTable<T extends Record<string, unknown>> extends Column<T> {}
