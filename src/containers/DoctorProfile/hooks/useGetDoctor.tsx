import { useQuery } from "react-query";

import { Doctor } from "../models/Doctor.model";
import DoctorService from "../services/Doctor.service";

export enum DoctorStateKeysEnum {
    Doctors = "doctors",
    CreateMajor = "createMajor",
    UpdatePracticing = "updatePracticing",
}

const useGetDoctor = (email: string = "nhanlt16235@gmail.com") => {
    let doctorService = new DoctorService<Doctor>();
    const result = useQuery<Doctor, Error>([DoctorStateKeysEnum.Doctors, email], async () => {
        const result = await doctorService.getDoctorByEmail(email);
        return result.data;
    });
    return result;
};

export default useGetDoctor;
