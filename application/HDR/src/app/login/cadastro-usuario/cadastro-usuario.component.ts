import { Component, OnInit } from '@angular/core';
import { isNull } from 'util';
declare let $: any;

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {

  crmCpf: string = null;
  senha: string = null;
  email: string = null;
  dataNascimento = null;
  indicaPaciente: boolean = false;

  constructor() { }

  ngOnInit() { 
    $(document).ready(function(){
      $('.datepicker').datepicker();
    });
  }

  public cadastrarNovoUsuario() {

  }

  public validarDadosPreenchidos() {
    if(isNull(this.crmCpf)) {
      
    }
  }
}
