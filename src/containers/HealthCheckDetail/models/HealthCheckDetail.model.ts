// import { Disease } from "src/containers/DiseaseManagemenent/models/Disease.model";
import { DiseaseGroup } from "src/containers/DiseaseGroupManagement/models/DiseaseGroup.model";
import { Doctors } from "src/containers/DoctorDetail/models/Doctor.model";
import { Drug } from "src/containers/DrugManagement/models/Drug.model";
import { Patient } from "src/containers/PatientManagement/models/Patient.model";
import { Symptom } from "src/containers/SymptomManagement/models/Symptom.model";

export type HealthCheck = {
    id?: number;
    height: number;
    weight: number;
    reasonCancel: string;
    rating: number;
    comment: string;
    advice: string;
    token: string;
    patientId: number;
    createdTime: string;
    canceledTime: string;
    patient: Patient;
    healthCheckDiseases: HealthCheckDiseases[];
    prescriptions: Prescriptions[];
    slot: Slots[];
    symptomHealthChecks: SymptomHealthChecks[];
    status: string;
};

export type HealthCheckDiseases = {
    id?: number;
    healthCheckId?: number;
    diseaseId?: number;
    isActive: boolean;
    disease: Disease;
};
export type Disease = {
    id?: number;
    diseaseCode: string;
    name: string;
    description: string;
    diseaseGroupId: number;
    diseaseGroup?: DiseaseGroup;
    isActive: boolean;
};
export type Prescriptions = {
    id?: number;
    healthCheckId: number;
    startDate: string;
    endDate: string;
    drugId: number;
    morningQuantity: number;
    afternoonQuantity: number;
    eveningQuantity: number;
    description: string;
    isActive: boolean;
    drug: Drug;
    drugTypeId: number;
};

export type Slots = {
    id?: number;
    assignedDate: string;
    doctorId?: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    doctor: Doctors;
};

export type SymptomHealthChecks = {
    id?: number;
    symptomId?: number;
    healthCheckId?: number;
    evidence: string;
    isActive: boolean;
    symptom: Symptom;
};
