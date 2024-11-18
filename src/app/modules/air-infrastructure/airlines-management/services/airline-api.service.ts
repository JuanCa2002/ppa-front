import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AirlineFilterDTO } from "../../../../dtos/air-infrastructure/airlines-management/airline-filter-dto";
import { PaginatedResponseDTO } from "../../../../dtos/paginated-response.dto";
import { AirlineDTO } from "../../../../dtos/air-infrastructure/airlines-management/airline-dto";
import { Observable } from "rxjs";
import { AirlineApiConstants } from "../../../../constants/apis/air-infrastructure/airline/airline-api-constants";

@Injectable({
    providedIn: "root",
})

export class AirlineApiService {

    constructor(private httpClient:HttpClient){}


    public getPaginatedAirlines$(filter: AirlineFilterDTO):Observable<PaginatedResponseDTO<AirlineDTO>>{
        let params = new HttpParams()
        .set('rowsPerPage', filter.rowsPerPage.toString())
        .set('skip', filter.skip.toString());
      
        if (filter.name) {
            params = params.set('name', filter.name.toString());
          }
        
          if (filter.state) {
            params = params.set('state', filter.state.toString());
          }
        return this.httpClient.get<PaginatedResponseDTO<AirlineDTO>>(AirlineApiConstants.URL_AIRLINE,{params})
    }

    public saveAirline$(airline: AirlineDTO):Observable<AirlineDTO>{
        return this.httpClient.post<AirlineDTO>(AirlineApiConstants.URL_AIRLINE,airline);
    }

    public updateStateAirline$(id: number):Observable<AirlineDTO>{
        return this.httpClient.patch<AirlineDTO>(`${AirlineApiConstants.URL_AIRLINE}/${id}`, null);
    }

}