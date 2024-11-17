import { DepartmentDto } from "../department-management/department.dto";

export class MunicipalityDTO {
    public id?: number;
    public name?: string;
    public state?: string;
    public department?: DepartmentDto;
    public departmentId?: number;
}