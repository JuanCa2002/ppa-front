import { PageDTO } from "../../page-dto";

export class AirportFilterDTO extends PageDTO{
    public name?: string;
    public locationId?: number;
    public departmentId?: number;
    public state?: string;
}