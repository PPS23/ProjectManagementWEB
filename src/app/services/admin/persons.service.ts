import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { PersonResponseDto } from 'src/app/DTOs/Persons/PersonResponseDto';
import { ApiResponse } from 'src/app/DTOs/APIResponse';
import { PersonRequestDto } from 'src/app/DTOs/Persons/PersonRequestDto';
import { PagedResult } from 'src/app/DTOs/PagedResponse';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  apiURL: string = "Person";

  constructor(private http: HttpClient) { }

  add(person: PersonRequestDto): Observable<any>{
    return this.http.post(`${this.apiURL}/Add`, person);
  }

  getById(id: number): Observable<ApiResponse<PersonResponseDto>> {
    return this.http.get<ApiResponse<PersonResponseDto>>(`${this.apiURL}/GetById/${id}`);
  }

  update(id: number, model: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/${id}`, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  getAll(): Observable<ApiResponse<PersonResponseDto[]>> {
    return this.http.get<ApiResponse<PersonResponseDto[]>>(`${this.apiURL}/GetAll`);
  }

  getAllPaged(page: number, pageSize: number): Observable<ApiResponse<PagedResult<PersonResponseDto[]>>> {
    return this.http.get<ApiResponse<PagedResult<PersonResponseDto[]>>>(`${this.apiURL}/GetPaged`, { params: { page: page, pageSize: pageSize }}).pipe(
      catchError(error => {
        console.error("Error fetching person data.");
        return throwError(() => new Error(error));
      })
    );
  }
}
