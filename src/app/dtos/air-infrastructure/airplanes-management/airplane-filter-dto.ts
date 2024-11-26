import { PageDTO } from "../../page-dto";

export class AirplaneFilterDTO extends PageDTO{

    public branch?: string;
    public model?: number;
    public state?: string;
    public airlineId?: number;

    
}