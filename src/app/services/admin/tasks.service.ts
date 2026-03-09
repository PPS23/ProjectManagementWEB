import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private api = "tasks";

  constructor(private http: HttpClient) { }

  getAll(includeRelations: boolean): Observable<any> {    
    return this.http.get<any[]>(`${this.api}/GetAll`, {params:{includeRelations: includeRelations.toString()}});
  }

  getAllPaged(page: number, pageSize: number): Observable<any>{
    return this.http.get<any[]>(`${this.api}/GetPaged`, {params:{page: page, pageSize: pageSize}});
  }

  getById(id: number, includeRelations: boolean): Observable<any> {
    const params = new HttpParams()
      .set('includeRelations', includeRelations);

    return this.http.get<any[]>(`${this.api}/GetById/${id}`, { params });
  }

    add(model: any): Observable<any> {
    return this.http.post(`${this.api}/Add`, model);
  }


}
