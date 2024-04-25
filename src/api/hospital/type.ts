interface RootObject {
  code: number;
  message: string;
  ok: boolean;
}

export interface Data {
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
  hospital: {
    id: string;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: {
      hostypeString: string;
      fullAddress: string;
    };
    hoscode: string;
    hosname: string;
    hostype: string;
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    address: string;
    logoData: string;
    intro: string;
    route: string;
    status: number;
    bookingRule?: any;
  };
}
export interface HospitalData extends RootObject {
  data: Data;
}

export interface Datum {
  depcode: string;
  depname: string;
  children?: Datum[];
}
export type OfficeData = Datum[];

export interface DepartmentData extends RootObject {
  data: OfficeData;
}

export interface registerDataForm {
  total: number;
  bookingScheduleList: [
    {
      workDate: string;
      workDateMd: string;
      dayOfWeek: string;
      docCount: number;
      reservedNumber: null | number;
      availableNumber: number;
      status: number;
    }
  ];
  baseMap: {
    workDateString: string;
    releaseTime: string;
    bigname: string;
    stopTime: string;
    depname: string;
    hosname: string;
  };
}

export interface registerData extends RootObject {
  data: registerDataForm;
}
