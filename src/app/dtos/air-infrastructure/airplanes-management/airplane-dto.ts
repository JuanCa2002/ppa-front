import { AirlineDTO } from "../airlines-management/airline-dto";

export class AirplaneDTO {

    public id?: number;
    public branch?: string;
    public model?: number;
    public state?: string;
    public airline?: AirlineDTO;
    public airlineId?: number;

}