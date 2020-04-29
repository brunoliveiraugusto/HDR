import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  idUsuario: number;
  chaveAcessoMedico: string = null;

  constructor(private service: HttpService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.idUsuario = Number.parseInt(params['idUsuario']);
    });
  }

  ngOnInit() {
    $(document).ready(function(){
      $('.tabs').tabs();
    });
  }

  public gerarChaveMedico() {
    if(isNaN(this.idUsuario) || this.idUsuario < 0) {
      return alert("É necessário realizar a autenticação para usar esse recurso.");
    } else {
      this.service.gerarChaveAcessoMedico(this.idUsuario)
      .subscribe((chave) => {
      this.chaveAcessoMedico = chave;
    },
    (error) => {
      alert("Erro ao gerar chave.");
    });
    } 
  }

}
