import { Injectable } from "@angular/core";
import { FlightDTO } from "../../../../dtos/flights/flight-management/flight-dto";
import { ScaleDTO } from "../../../../dtos/flights/flight-management/scale-dto";

@Injectable({
    providedIn: "root",
})

export class FlightDataService {

    private cacheFlight: FlightDTO | null = null;
    private isUpdate: boolean = false;
    private previousScales: ScaleDTO[] = [];

    public addData(parcialflight:FlightDTO){
       if(this.cacheFlight === null) this.cacheFlight = new FlightDTO();
       this.cacheFlight = {...this.cacheFlight, ...parcialflight};
    }

    public getCacheFligth(): FlightDTO | null {
        return this.cacheFlight;
    }

    public addPreviousScales(scales: ScaleDTO[]){
        this.previousScales = scales;
    }

    public getPreviousScales(){
        return this.previousScales;
    }

    public removeData(){
        this.cacheFlight = null;
        this.isUpdate = false;
        this.previousScales = [];
    }

    public setIsUpdate(flag: boolean){
        this.isUpdate = flag;
    }

    public getFlag(): boolean {
        return this.isUpdate;
    }

}