import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Arquivo } from '../rules/Arquivo';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @Output() idUsuario: number;
  @Output() indicaPaciente: boolean;
  @Output() idUsuarioMedico: number;
  
  chaveAcessoMedico: string = null;
  listaArquivos: Array<Arquivo> = new Array<Arquivo>();

  constructor(private service: HttpService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.idUsuario = Number.parseInt(params['idUsuario']);
      this.indicaPaciente = params['indicaPaciente'] == "true";
      this.idUsuarioMedico = Number.parseInt(params['idUsuarioMedico']);
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
