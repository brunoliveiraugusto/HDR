import { Component, OnInit } from '@angular/core';
import { isNull } from 'util';
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
  indicaPaciente: boolean = false;

  constructor(private service: HttpService) { }

  ngOnInit() { }

  public cadastrarNovoUsuario() {
    this.validarDadosPreenchidos();

    this.service.cadastrarUsuario()
    .subscribe((result) => {
      //código para o retorno da chamada do serviço
    },
    (error) => {
      console.error(error);
    });; 
  }

  public validarDadosPreenchidos() {
    if(isNull(this.nomeCompleto)) {
      alert("O campo NOME COMPLETO não foi preenchido.");  
      return;
    }

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
