import { Injectable } from "@angular/core";
import { FlightDTO } from "../../../../dtos/flights/flight-management/flight-dto";

@Injectable({
    providedIn: "root",
})

export class FlightDataService {

    private cacheFlight: FlightDTO | null = null;

    public addData(parcialflight:FlightDTO){
       if(this.cacheFlight === null) this.cacheFlight = new FlightDTO();
       this.cacheFlight = {...this.cacheFlight, ...parcialflight};
    }

    public getCacheFligth(): FlightDTO | null {
        return this.cacheFlight;
    }

    public removeData(){
        this.cacheFlight = null;
    }

}