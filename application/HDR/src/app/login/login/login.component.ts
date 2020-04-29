import { Component, OnInit } from '@angular/core';
import { isNull } from 'util';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router'; 

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
  exibirCampoChave: boolean = false;
  chaveAcessoMedico: string;

  constructor(private service: HttpService, private router: Router) { }

  ngOnInit() {}

  public validarLogin() {
    if(isNull(this.username)) {
      return alert("CPF/CRM não foi informado.");
    }

    if(isNull(this.password)) {
      return alert("SENHA não foi informada.");
    }

    if(isNull(this.tipoUsuario)) {
      return alert("Tipo de Usuário não foi informado.");
    }

    this.login();
  }

  public validarChaveDigitada(chaveDigitada: string) {
    if(isNull(chaveDigitada)) {
      return alert("A chave de acesso não foi informada.");
    } else {
      this.service.validarChaveAcessoMedico(chaveDigitada)
      .subscribe((idUsuario) => {

      }, (error) => {
        
      });
    }
  }

  public verificarChaveDigitada(chave: string) {

  }

  public login() {
    this.indicaPaciente = (this.tipoUsuario == "paciente");
    this.service.realizarLogin(this.username, this.password, this.indicaPaciente)
    .subscribe((idUsuario) => {
      if(this.indicaPaciente && !isNaN(idUsuario)) {
        this.router.navigate(['/home', {'idUsuario': idUsuario}]);
      } else if(!this.indicaPaciente && !isNaN(idUsuario)){
        this.exibirCampoChave = true;
        this.validarChaveDigitada(this.chaveAcessoMedico);
      }
    },
    (error) => {
      alert("Usuário ou senha incorreto.");
    }); 
  }
}
