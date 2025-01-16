import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AirplaneDTO } from "../../../../dtos/air-infrastructure/airplanes-management/airplane-dto";
import { AirplaneFilterDTO } from "../../../../dtos/air-infrastructure/airplanes-management/airplane-filter-dto";
import { Observable } from "rxjs";
import { PaginatedResponseDTO } from "../../../../dtos/paginated-response.dto";
import { AirplaneApiConstants } from "../../../../constants/apis/air-infrastructure/airplane/airplane-api-constants";

@Injectable({
    providedIn: "root",
})

export class AirplaneApiService {

    constructor(private httpClient:HttpClient){}

    public getPaginatedAirplanes$(filter: AirplaneFilterDTO):Observable<PaginatedResponseDTO<AirplaneDTO>>{
        let params = new HttpParams()
        .set('rowsPerPage', filter.rowsPerPage.toString())
        .set('skip', filter.skip.toString())
        .set('airlineId', filter.airlineId!.toString());
      
        if (filter.branch) {
            params = params.set('branch', filter.branch.toString());
          }

          if (filter.model) {
            params = params.set('model', filter.model.toString());
          }
        
          if (filter.state) {
            params = params.set('state', filter.state.toString());
          }
        return this.httpClient.get<PaginatedResponseDTO<AirplaneDTO>>(AirplaneApiConstants.URL_AIRLINE,{params})
    }

    public getAirplaneById$(id: number): Observable<AirplaneDTO>{
      return this.httpClient.get<AirplaneDTO>(`${AirplaneApiConstants.URL_AIRLINE}/${id}`);
    }

    public postAirplane$(airplane: AirplaneDTO):Observable<AirplaneDTO>{
      return this.httpClient.post<AirplaneDTO>(AirplaneApiConstants.URL_AIRLINE,airplane);
    }

    public putAirplane$(airplane: AirplaneDTO):Observable<AirplaneDTO>{
      return this.httpClient.put<AirplaneDTO>(AirplaneApiConstants.URL_AIRLINE,airplane);
    }

    public patchAirplane$(id: number):Observable<AirplaneDTO>{
      return this.httpClient.patch<AirplaneDTO>(`${AirplaneApiConstants.URL_AIRLINE}/${id}`, null);
    }
    
}