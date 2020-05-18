import { Component, OnInit } from '@angular/core';
import { isNull, isNullOrUndefined } from 'util';
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
  idUsuarioMedico: number = 0;

  exibeLoading: boolean = false;

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

    this.exibeLoading = true;
    this.login();
  }

  public validarChaveDigitada() {
    if(isNull(this.chaveAcessoMedico) || this.chaveAcessoMedico == "") {
      return alert("A chave de acesso não foi informada.");
    } else {
      this.exibeLoading = true;
      this.verificarChaveDigitada(this.chaveAcessoMedico);
    }
  }

  public verificarChaveDigitada(chave: string) {
    this.service.validarChaveAcessoMedico(chave)
      .subscribe((idUsuario) => {
        this.exibeLoading = false;
        this.router.navigate(['/home-medico', {'idUsuario': idUsuario, 'indicaPaciente': this.indicaPaciente, 'idUsuarioMedico': this.idUsuarioMedico}]);
      }, (error) => {
        this.exibeLoading = false;
        alert("A chave digitada é inválida.");
      });
  }

  public login() {
    this.indicaPaciente = (this.tipoUsuario == "paciente");
    this.service.realizarLogin(this.username, this.password, this.indicaPaciente)
    .subscribe((dadosUsuario) => {
      if(this.indicaPaciente && !isNullOrUndefined(dadosUsuario) && dadosUsuario.indicaPaciente) {
        this.exibeLoading = false;
        this.router.navigate(['/home', {'idUsuario': dadosUsuario.idUsuario, 'indicaPaciente': dadosUsuario.indicaPaciente, 'idUsuarioMedico': this.idUsuarioMedico}]);
      } else if(!this.indicaPaciente && !isNullOrUndefined(dadosUsuario)){
        this.exibeLoading = false;
        this.exibirCampoChave = true;
        this.idUsuarioMedico = dadosUsuario.idUsuario;
        this.indicaPaciente = dadosUsuario.indicaPaciente;        
      }
    },
    (error) => {
      this.exibeLoading = false;
      alert("Usuário ou senha incorreto.");
    }); 
  }
}
