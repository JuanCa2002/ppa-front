import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MunicipalityDTO } from "../../../../dtos/locations/municipalities-management/municipality.dto";
import { MunicipalityApiConstant } from "../../../../constants/router/municipalities/municipality-api-constant";

@Injectable({
    providedIn: "root",
})

export class MunicipalityApiService{

    constructor(private httpClient:HttpClient){}

    public getMunicipalities$(filter: MunicipalityDTO):Observable<MunicipalityDTO[]>{
        let params = new HttpParams()
        .set('departmentId', filter.departmentId!.toString());
      
        if (filter.name) {
            params = params.set('name', filter.name.toString());
          }
        
        if (filter.state) {
            params = params.set('state', filter.state.toString());
        }
        return this.httpClient.get<MunicipalityDTO[]>(MunicipalityApiConstant.URL_MUNICIPALITY,{params})
    }

    public saveMunicipality$(municipality: MunicipalityDTO):Observable<MunicipalityDTO>{
        return this.httpClient.post<MunicipalityDTO>(MunicipalityApiConstant.URL_MUNICIPALITY, municipality);
    }

    public updateStateMunicipality$(id: number): Observable<MunicipalityDTO>{
        return this.httpClient.patch<MunicipalityDTO>(`${MunicipalityApiConstant.URL_MUNICIPALITY}/${id}`, null)
    }

    public updateMunicipality$(municipality: MunicipalityDTO): Observable<MunicipalityDTO>{
        return this.httpClient.put<MunicipalityDTO>(`${MunicipalityApiConstant.URL_MUNICIPALITY}`, municipality);
    }

}