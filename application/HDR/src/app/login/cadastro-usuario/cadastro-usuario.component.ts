import { Component, OnInit } from '@angular/core';
import { isNull, isUndefined } from 'util';
import { HttpService } from 'src/app/services/http.service';
import { Usuario } from '../../rules/Usuario';

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

  constructor(private service: HttpService) { }

  ngOnInit() {
    //$(document).ready(function(){
      //$("#cpf").mask("999.999.999-99");
    //});
   }

  public cadastrarNovoUsuario() {
    let usuario = this.preencherUsuario();
    this.service.cadastrarUsuario(usuario)
    .subscribe((result) => {
      alert("O usuário foi criado com sucesso, seja bem vindo!")
      //implementar redirecionamento para tela de login
    },
    (error) => {
      alert("Houve um problema na criação do usuário.")
    });; 
  }

  public preencherUsuario() {

    var usuario = new Usuario();
    usuario.NomeCompleto = this.nomeCompleto;
    usuario.CpfCrm = this.cpfCrm;
    usuario.ChaveAcesso = this.chaveAcesso;
    usuario.Email = this.email;
    usuario.DataNascimento = this.dataNascimento;
    usuario.IndicaPaciente = (this.tipoUsuario === "paciente");

    return usuario;
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
