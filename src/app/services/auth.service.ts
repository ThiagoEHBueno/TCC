import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: any): Observable<any> {
    console.log('Dados a serem enviados:', usuario);
    const url = `${this.baseUrl}/cadastrarUsuario`;
    return this.http.post(url, usuario);
  }
}
