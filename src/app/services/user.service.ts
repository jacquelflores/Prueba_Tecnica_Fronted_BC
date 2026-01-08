import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {

  private api = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<any[]>(this.api);
  }

  get(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
