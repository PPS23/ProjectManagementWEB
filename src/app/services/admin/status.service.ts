import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  apiURL: string = "status";
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}/GetAll`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}/GetById/${id}`);
  }

  add(model: any): Observable<any> {
    return this.http.post(`${this.apiURL}/Add`, model);
  }

  update(id: number, model: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/${id}`, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
      
}
