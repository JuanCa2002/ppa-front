import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FlightFilterDTO } from "../../../../dtos/flights/flight-management/flight-filter.dto";
import { PaginatedResponseDTO } from "../../../../dtos/paginated-response.dto";
import { Observable } from "rxjs";
import { FlightDTO } from "../../../../dtos/flights/flight-management/flight-dto";
import { FlightApiConstants } from "../../../../constants/apis/fligths/flight/flight-api-constants";

@Injectable({
    providedIn: "root",
})

export class FlightApiService {

    constructor(private httpClient:HttpClient){}


    public postFlight$(flight: FlightDTO): Observable<FlightDTO>{
       return this.httpClient.post<FlightDTO>(FlightApiConstants.URL_FLIGHT, flight);
    }

    public getPaginatedFlights$(filter: FlightFilterDTO):Observable<PaginatedResponseDTO<FlightDTO>>{
        let params = new HttpParams()
        .set('rowsPerPage', filter.rowsPerPage.toString())
        .set('skip', filter.skip.toString())
        .set('originId', filter.originId!.toString())
        .set('destinyId', filter.destinyId!.toString())
      
        if (filter.airlineId) {
            params = params.set('airlineId', filter.airlineId.toString());
        }

        if (filter.exitDate) {
            params = params.set('exitDate', filter.exitDate.toString());
        }
        
        if (filter.state) {
            params = params.set('state', filter.state.toString());
        }

        if (filter.exitTime){
            params = params.set('exitTime', filter.exitTime.toString());
        }

        if (filter.isDirect){
            params = params.set('isDirect', filter.isDirect.toString());
        }
        return this.httpClient.get<PaginatedResponseDTO<FlightDTO>>(FlightApiConstants.URL_FLIGHT,{params})
    }
}