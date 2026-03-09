import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  apiURL: string = "Comments";
  constructor(private http: HttpClient) { }

    getById(id: number): Observable<any> {
      return this.http.get<any[]>(`${this.apiURL}/GetById/${id}`);
    }

    add(model: any): Observable<any> {
      return this.http.post(`${this.apiURL}/Add`, model);
    }
}
