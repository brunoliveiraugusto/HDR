import { Component, OnInit } from '@angular/core';
import { isNull, isUndefined } from 'util';
import { HttpService } from 'src/app/services/http.service';

declare let $: any;

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {

  nomeCompleto: string = null;
  cpfCrm: string = null;
  senha: string = null;
  email: string = null;
  dataNascimento: Date = null;
  indicaPaciente: boolean;

  constructor(private service: HttpService) { }

  ngOnInit() { }

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
    let usuario = {
      nomeCompleto: this.nomeCompleto,
      cpfCrm: this.cpfCrm,
      senha: this.senha,
      email: this.email,
      dataNascimento: this.dataNascimento,
      indicaPaciente: this.indicaPaciente
    }

    return usuario;
  }

  public criarUsuario() {

    if(isNull(this.nomeCompleto)) {
      return alert("O campo NOME COMPLETO não foi preenchido.");  
    }

    if(isNull(this.cpfCrm)) {
      return alert("O campo CRM/CPF não foi preenchido.");  
    }

    if(isNull(this.senha)) {
      return alert("O campo SENHA não foi preenchido.");  
    }

    if(isNull(this.email)) {
      return alert("O campo E-MAIL não foi preenchido.");  
    }

    if(isNull(this.dataNascimento)) {
      return alert("O campo DATA DE NASCIMENTO não foi preenchido.");  
    }

    if(isUndefined(this.indicaPaciente)) {
      return alert("Informe o tipo de usuário.");  
    }

    this.cadastrarNovoUsuario();
  }
}
