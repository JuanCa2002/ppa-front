export class ItineraryDTO {
    public id?: number;
    public departmentOriginId?: number;
    public originPlaceId?: number;
    public originId?: number;
    public departmentDestinyId?: number;
    public destinyPlaceId?: number;
    public destinyId?: number;
    public estimatedTime?: number;
    public unitTime?: string; 
    public exitTime?: string;
    public arrivalTime?: string; 
    public exitDate?: string;
    public arrivalDate?: string;  
}