import { PageDTO } from "../../page-dto";

export class FlightFilterDTO extends PageDTO{
    public price?: number;
    public state?: string;
    public exitDate?: string;
    public exitTime?: string;
    public estimatedTime?: number;
    public unitTime?: string;
    public airlineId?: bigint;
    public originId?: bigint;
    public destinyId?: bigint;
    public isDirect?: boolean;
}