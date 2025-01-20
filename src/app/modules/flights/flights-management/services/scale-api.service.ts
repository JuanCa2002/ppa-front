import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ScaleDTO } from "../../../../dtos/flights/flight-management/scale-dto";
import { Observable } from "rxjs";
import { ScaleApiConstants } from "../../../../constants/apis/fligths/scale/scale-api-constants";

@Injectable({
    providedIn: "root",
})

export class ScaleApiService {

    constructor(private httpClient:HttpClient){}

    public postScales(scales: ScaleDTO[]): Observable<ScaleDTO[]>{
      return this.httpClient.post<ScaleDTO[]>(ScaleApiConstants.URL_SCALE, scales);
    }

    public deleteScale(id: number): Observable<void>{
      return this.httpClient.delete<void>(`${ScaleApiConstants.URL_SCALE}/${id}`);
    }

    public getScalesByItineraryId(itineraryId: number): Observable<ScaleDTO[]>{
      return this.httpClient.get<ScaleDTO[]>(`${ScaleApiConstants.URL_SCALE}/itinerary/${itineraryId}`); 
    }

    
}