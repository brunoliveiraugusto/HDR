import { Injectable } from '@angular/core';
import { Usuario } from '../rules/Usuario';  
import { Headers, Http, Response } from '@angular/http'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Arquivo } from '../rules/Arquivo';

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

  public realizarLogin = (login: string, password: string, indicaPaciente: boolean) : Observable<number> => {
    let route: string = 'http://localhost:5000/Autenticacao/AutenticarUsuario?login='+login+'&password='+password+'&indicaPaciente='+indicaPaciente;
    return this.httpService.get<number>(route, {responseType: 'json'});
  }

  public gerarChaveAcessoMedico = (idUsuario: number) : Observable<string> => {
    let route: string = 'http://localhost:5000/Autenticacao/GerarChaveMedico?idUsuario='+idUsuario;
    return this.httpService.get(route, {responseType: 'text'});
  }

  public validarChaveAcessoMedico = (chaveMedica: string) : Observable<number> => {
    let route: string = 'http://localhost:5000/Autenticacao/ValidarChaveAcessoMedico?chave='+chaveMedica;
    return this.httpService.get<number>(route, {responseType: 'json'});
  }

  public salvarArquivoAnexado = (pdf: Arquivo): Observable<boolean> => {
    let route: string = 'http://localhost:5000/Arquivo/SalvarArquivo';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
      })
    };

    var json = JSON.stringify(pdf);
    return this.httpService.post<boolean>(route, json, httpOptions);
  }
  
  public carregarArquivosAnexados = (idUsuario: number) : Observable<Array<Arquivo>> => {
    let route: string = 'http://localhost:5000/Arquivo/CarregarArquivosPorUsuario?chave='+idUsuario;
    return this.httpService.get<Array<Arquivo>>(route, {responseType: 'json'});
  }

}
