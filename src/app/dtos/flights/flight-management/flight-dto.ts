import { ItineraryDTO } from "./itinerary-dto";
import { ScaleDTO } from "./scale-dto";

export class FlightDTO {
    public id?: number;
    public price?: number;
    public itineraryId?: number;
    public airplaneId?: number;
    public airlineId?:  number;
    public state?: string;
    public isDirect?: boolean;
    public municipalityOriginName?: string;
    public estimatedTime?: number;
    public unitTime?: string;
    public municipalityDestinyName?: string; 
    public itinerary?: ItineraryDTO;
    public scales?: ScaleDTO[] = [];
}