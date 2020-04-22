import { Component, OnInit } from '@angular/core';
import { isNull } from 'util';

declare let $: any;

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {

  cpfCrm: string = null;
  senha: string = null;
  email: string = null;
  dataNascimento: Date = null;
  indicaPaciente: boolean = false;

  constructor() { }

  ngOnInit() { }

  public cadastrarNovoUsuario() {
    this.validarDadosPreenchidos();
  }

  public validarDadosPreenchidos() {
    if(isNull(this.cpfCrm)) {
      alert("O campo CRM/CPF não foi preenchido.");  
      return;
    }

    if(isNull(this.senha)) {
      alert("O campo SENHA não foi preenchido.");
      return;  
    }

    if(isNull(this.email)) {
      alert("O campo E-MAIL não foi preenchido.");  
      return;
    }

    if(isNull(this.dataNascimento)) {
      alert("O campo DATA DE NASCIMENTO não foi preenchido.");  
      return;
    }
  }
}
