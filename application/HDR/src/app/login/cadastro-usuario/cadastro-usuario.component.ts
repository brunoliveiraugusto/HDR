import { Component, OnInit } from '@angular/core';
import { isNull, isUndefined } from 'util';
import { HttpService } from 'src/app/services/http.service';
import { Usuario } from '../../rules/Usuario';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {

  nomeCompleto: string = null;
  cpfCrm: string = null;
  chaveAcesso: string = null;
  email: string = null;
  dataNascimento: Date = null;
  tipoUsuario: string = null;
  usuario: Usuario;

  constructor(private service: HttpService, private router: Router) { }

  ngOnInit() {
    //$(document).ready(function(){
      //$("#cpf").mask("999.999.999-99");
    //});
   }

  public cadastrarNovoUsuario() {
    let usuario = this.preencherUsuario();
    this.service.cadastrarUsuario(usuario)
    .subscribe((result) => {
      alert("O usuário foi criado com sucesso, seja bem vindo!");
        
      this.nomeCompleto = null;
      this.cpfCrm = null;
      this.chaveAcesso = null;
      this.email = null;
      this.dataNascimento = null;
      this.tipoUsuario = null;
    },
    (error) => {
      alert("Houve um problema na criação do usuário.")
    });; 
  }

  public preencherUsuario() {

    this.usuario = new Usuario();
    this.usuario.NomeCompleto = this.nomeCompleto;
    this.usuario.CpfCrm = this.cpfCrm;
    this.usuario.ChaveAcesso = this.chaveAcesso;
    this.usuario.Email = this.email;
    this.usuario.DataNascimento = this.dataNascimento;
    this.usuario.IndicaPaciente = (this.tipoUsuario === "paciente");

    return this.usuario;
  }

  public criarUsuario() {

    if(isNull(this.nomeCompleto)) {
      return alert("O campo NOME COMPLETO não foi preenchido.");  
    }

    if(isNull(this.cpfCrm)) {
      return alert("O campo CPF/CRM não foi preenchido.");  
    }

    if(isNull(this.chaveAcesso)) {
      return alert("O campo SENHA não foi preenchido.");  
    }

    if(isNull(this.email)) {
      return alert("O campo E-MAIL não foi preenchido.");  
    }

    if(isNull(this.dataNascimento)) {
      return alert("O campo DATA DE NASCIMENTO não foi preenchido.");  
    }

    if(isNull(this.tipoUsuario)) {
      return alert("O tipo de usuário não foi preenchido.");  
    }

    this.cadastrarNovoUsuario();
  }

  public removerAcentuacoes() {
    let regex = new RegExp(/([^\d])+/gim);
    let cpfCrmAux = this.cpfCrm.replace(regex, "");
    this.cpfCrm = cpfCrmAux; 
  }
}
