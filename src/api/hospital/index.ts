import request from "@/utils/request";

import type {
  HospitalData,
  DepartmentData,
  RegisterData,
  HospitalArrangeListData,
  UserResponseData,
  DoctorData,
} from "@/api/hospital/type";

enum API {
  hospitalUrl = "/hosp/hospital/",
  hospitalOffice = "/hosp/hospital/department/",

  registerData = "/hosp/hospital/auth/getBookingScheduleRule/",

  // 获取可预约排班数据
  getBookingScheduleLists = "/hosp/hospital/auth/findScheduleList/",

  //就诊人
  getVisitors = "/user/patient/auth/findAll",

  // 获取医生信息
  getDoctorInfo = "/hosp/hospital/getSchedule/",
}

export const reqHospital = (hoscode: string) => {
  return request.get<string, HospitalData>(API.hospitalUrl + hoscode);
};

export const reqHospitalDepartment = (hoscode: string) => {
  return request.get<string, DepartmentData>(API.hospitalOffice + hoscode);
};

export const reqHospitalRegisterData = (
  page: number,
  limit: number,
  hoscode: string,
  depcode: string
) => {
  return request.get<string, RegisterData>(
    API.registerData + page + "/" + limit + "/" + hoscode + "/" + depcode
  );
};

export const reqHospitalBookingScheduleLists = (
  hoscode: string,
  depcode: string,
  workDate: string
) => {
  return request.get<string, HospitalArrangeListData>(
    API.getBookingScheduleLists + hoscode + "/" + depcode + "/" + workDate
  );
};

export const reqHospitalVisitors = () => {
  return request.get<string, UserResponseData>(API.getVisitors);
};

export const reqHospitalDoctorInfo = (scheduleId: string) => {
  return request.get<string, DoctorData>(API.getDoctorInfo + scheduleId);
};
