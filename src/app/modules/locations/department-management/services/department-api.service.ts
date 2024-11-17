import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PaginatedResponseDTO } from "../../../../dtos/paginated-response.dto";
import { Observable } from "rxjs";
import { DepartmentApiConstant } from "../../../../constants/router/department/department-api-constant";
import { DepartmentFilterDTO } from "../../../../dtos/locations/department-management/department-filter.dto";
import { DepartmentDto } from "../../../../dtos/locations/department-management/department.dto";

@Injectable({
    providedIn: "root",
})

export class DepartmentApiService{

    constructor(private httpClient:HttpClient){}

    public getPaginatedDepartments$(filter: DepartmentFilterDTO):Observable<PaginatedResponseDTO<DepartmentDto>>{
        let params = new HttpParams()
        .set('rowsPerPage', filter.rowsPerPage.toString())
        .set('skip', filter.skip.toString());
      
        if (filter.name) {
            params = params.set('name', filter.name.toString());
          }
        
          if (filter.state) {
            params = params.set('state', filter.state.toString());
          }
        return this.httpClient.get<PaginatedResponseDTO<DepartmentDto>>(DepartmentApiConstant.URL_DEPARTMENT,{params})
    }

    public saveDepartment$(department: DepartmentDto):Observable<DepartmentDto>{
        return this.httpClient.post<DepartmentDto>(DepartmentApiConstant.URL_DEPARTMENT,department)
    }

    public patchStateDepartment$(id:number):Observable<DepartmentDto>{
        return this.httpClient.patch<DepartmentDto>(`${DepartmentApiConstant.URL_DEPARTMENT}/${id}`, null);
    }

    public updateDepartment$(department: DepartmentDto):Observable<DepartmentDto>{
        return this.httpClient.put<DepartmentDto>(DepartmentApiConstant.URL_DEPARTMENT,department)
    }

}