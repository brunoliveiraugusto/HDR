import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../rules/Usuario';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpService: HttpClient) { }

  public cadastrarUsuario = (usuario: Usuario): Observable<boolean> => {
    let route: string = 'http://localhost:5000/Usuario/CriarUsuario?usuario=' +JSON.stringify(usuario);
    return this.httpService.get<boolean>(route, {responseType: 'json'});
  }
}
