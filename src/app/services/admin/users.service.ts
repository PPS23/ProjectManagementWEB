import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseService } from '../base.service';
import { UserResponseDto } from '../../DTOs/Users/UserResponseDto';
import { UserRequestDto } from '../../DTOs/Users/UserRequestDto';
import { ApiResponse } from 'src/app/DTOs/APIResponse';
import { PagedResult } from '../../DTOs/PagedResponse';
import { LoginDto } from 'src/app/DTOs/Users/LoginDto';
import { CurrentUserDto } from 'src/app/DTOs/Users/CurrentUserDto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURL: string = "User";
  constructor(private http: HttpClient) {

     }
  
    
  add(user: UserRequestDto): Observable<any>{
      return this.http.post(`${this.apiURL}/Add`, user);
    }

  getAll(): Observable<ApiResponse<UserResponseDto[]>> {
    return this.http.get<ApiResponse<UserResponseDto[]>>("User/GetAll").pipe(
      catchError(error => {
        console.error("Error fetching user data.");
        return throwError(() => new Error(error));
      })
    );
  }

  getAllPaged(page: number, pageSize: number): Observable<ApiResponse<PagedResult<UserResponseDto[]>>> {
    return this.http.get<ApiResponse<PagedResult<UserResponseDto[]>>>("User/GetPaged", { params:{page: page, pageSize: pageSize }}).pipe(
      catchError(error => {
        console.error("Error fetching user data.");
        return throwError(() => new Error(error));
      })
    );
  }

  getById(id: number): Observable<ApiResponse<UserResponseDto[]>> {
    return this.http.get<ApiResponse<UserResponseDto[]>>(`${this.apiURL}/GetById/${id}`);
  }

  update(id: number, model: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/${id}`, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  login(loginDto: LoginDto): Observable<ApiResponse<CurrentUserDto>> {
    return this.http.post<ApiResponse<CurrentUserDto>>(`${this.apiURL}/GetByDomainNameAndPassword`, loginDto);
  }

    
}
