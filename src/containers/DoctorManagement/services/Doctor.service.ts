import axios from "../../../axios";

import { Doctors } from "src/containers/DoctorDetail/models/Doctor.model";

class DoctorService {
    get(limit: number, offset: number) {
        return axios.get(`/doctors?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get(`/doctors/${id}`);
    }

    create(data: Doctors) {
        return axios.post("/doctors", data);
    }

    update(data: Doctors) {
        return axios.put(`/doctors/${data.id}`, data);
    }

    delete(id: number) {
        return axios.delete(`/doctors/${id}`);
    }

    updateFormData(data: FormData) {
        return axios.put("/doctors", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }

    createMajor = async (data: any) => {
        try {
            let formData = new FormData();
            formData.append("Id", JSON.stringify(data?.Id));
            formData.append("PractisingCertificate", data.PractisingCertificate);
            formData.append("CertificateCode", data.CertificateCode);
            formData.append("PlaceOfCertificate", data.PlaceOfCertificate);
            formData.append("DateOfCertificate", data.DateOfCertificate);
            formData.append("ScopeOfPractice", data.ScopeOfPractice);
            formData.append("Description", data.Description);
            formData.append("IsActive", JSON.stringify(data.IsActive));
            formData.append("HospitalDoctors", JSON.stringify(data.HospitalDoctors));
            formData.append("MajorDoctors", JSON.stringify(data.MajorDoctors));
            const response = await this.updateFormData(formData);
            if (response.status === 200) {
                // eslint-disable-next-line no-console
                console.log("formdata", response.data);
                // refreshPage();
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    };
}

export default new DoctorService();
