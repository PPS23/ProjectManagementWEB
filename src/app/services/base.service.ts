import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseService<T, TId> {

  protected constructor(
    protected http: HttpClient,
    protected endpoint: string
  ) {}

  getAll(): Observable<T> {
    return this.http.get<T>(this.endpoint);
  }

  getById(id: TId): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  add(entity: T): Observable<T> {
    return this.http.post<T>(this.endpoint, entity);
  }

  update(id: TId, entity: T): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/${id}`, entity);
  }

  delete(id: TId): Observable<T> {
    return this.http.delete<T>(`${this.endpoint}/${id}`);
  }
}
