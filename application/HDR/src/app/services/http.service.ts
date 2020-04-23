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

  /*public cadastrarUsuario2(usuario: Usuario){
    let route: string = 'http://localhost:5000/Usuario/CriarUsuario';
    //Criando header da requisição
    var header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    //transformando objeto em json para passá-lo no corpo da requisição
    var json = JSON.stringify(usuario);
    var params = 'json='+json;
    
    return this.httpService.post(route, params, {headers: header});
  }*/

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

}
