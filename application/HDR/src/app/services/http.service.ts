import { Injectable } from '@angular/core';
import { Usuario } from '../rules/Usuario';  
import { Headers, Http, Response } from '@angular/http'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpService: HttpClient) { }

  public cadastrarUsuario = (usuario: Usuario): Observable<boolean> => {
    let route: string = 'http://localhost:5000/Usuario/CriarUsuario';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
      })
    };

    var json = JSON.stringify(usuario);
    return this.httpService.post<boolean>(route, json, httpOptions);
  }

  public realizarLogin = (login: string, password: string, indicaPaciente: boolean) : Observable<boolean> => {
    let route: string = 'http://localhost:5000/Autenticacao/AutenticarUsuario?login='+login+'&password='+password+'&indicaPaciente='+indicaPaciente;
    return this.httpService.get<boolean>(route, {responseType: 'json'});
  }

}
