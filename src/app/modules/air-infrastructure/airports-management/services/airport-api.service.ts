import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AirportFilterDTO } from "../../../../dtos/air-infrastructure/airports-management/airport-filter-dto";
import { Observable } from "rxjs";
import { PaginatedResponseDTO } from "../../../../dtos/paginated-response.dto";
import { AirportDTO } from "../../../../dtos/air-infrastructure/airports-management/airport-dto";
import { AirportApiConstants } from "../../../../constants/apis/air-infrastructure/airport/airport-api-constants";

@Injectable({
    providedIn: "root",
})

export class AirportApiService {

    constructor(private httpClient:HttpClient){}

    public getPaginatedAirports$(filter: AirportFilterDTO):Observable<PaginatedResponseDTO<AirportDTO>>{
        let params = new HttpParams()
        .set('rowsPerPage', filter.rowsPerPage.toString())
        .set('skip', filter.skip.toString())
      
        if (filter.departmentId) {
            params = params.set('departmentId', filter.departmentId.toString());
        }

        if (filter.locationId) {
            params = params.set('locationId', filter.locationId.toString());
        }
        
        if (filter.state) {
            params = params.set('state', filter.state.toString());
        }

        if (filter.name){
            params = params.set('name', filter.name.toString());
        }
        return this.httpClient.get<PaginatedResponseDTO<AirportDTO>>(AirportApiConstants.URL_AIRPORT,{params})
    }

    public postAirports$(airport: AirportDTO):Observable<AirportDTO>{
        return this.httpClient.post<AirportDTO>(AirportApiConstants.URL_AIRPORT, airport);
    }

    public putAirports$(airport: AirportDTO):Observable<AirportDTO>{
        return this.httpClient.put<AirportDTO>(AirportApiConstants.URL_AIRPORT, airport);
    }

    public patchAirports$(id: number, state: string):Observable<AirportDTO>{
        return this.httpClient.patch<AirportDTO>(`${AirportApiConstants.URL_AIRPORT}/${id}?state=${state}`, null);
    }
}