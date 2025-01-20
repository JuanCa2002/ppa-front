import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ItineraryDTO } from "../../../../dtos/flights/flight-management/itinerary-dto";
import { ItineraryApiConstants } from "../../../../constants/apis/fligths/itinerary/itinerary-api-constants";

@Injectable({
    providedIn: "root",
})

export class ItineraryApiService {

    constructor(private httpClient:HttpClient){}

    public postItinerary(itinerary: ItineraryDTO): Observable<ItineraryDTO>{
      return this.httpClient.post<ItineraryDTO>(ItineraryApiConstants.URL_ITINERARY, itinerary);
    }

    public putItinerary(itinerary: ItineraryDTO): Observable<ItineraryDTO>{
      return this.httpClient.put<ItineraryDTO>(ItineraryApiConstants.URL_ITINERARY, itinerary);
    }

    public getItineraryById$(id: number): Observable<ItineraryDTO>{
      return this.httpClient.get<ItineraryDTO>(`${ItineraryApiConstants.URL_ITINERARY}/${id}`);
    }

    
}