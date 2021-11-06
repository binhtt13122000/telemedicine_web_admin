export type Hospital = {
    id?: number;
    hospitalCode: string;
    name: string;
    address: string;
    description?: string;
    isActive: boolean;
    lat?: number;
    long?: number;
};
