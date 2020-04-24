import { Component, OnInit } from '@angular/core';
import { isNull } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string = null;
  password: string = null;
  indicaPaciente: boolean;
  tipoUsuario: string = null;
  
  constructor() { }

  ngOnInit() {}

  public validarLogin() {
    if(isNull(this.username)) {
      alert("CPF/CRM não foi informado.");
    }

    if(isNull(this.password)) {
      alert("SENHA não foi informada.");
    }

    if(isNull(this.tipoUsuario)) {
      alert("Tipo de Usuário não foi informado.");
    }

    this.login();
  }

  public login() {
    this.indicaPaciente = (this.tipoUsuario == "paciente");
  }
}
