import { Component, OnInit } from '@angular/core';
import { isNull, isUndefined, isNullOrUndefined } from 'util';
import { HttpService } from 'src/app/services/http.service';
import { Usuario } from '../../rules/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { Medico } from 'src/app/rules/Medico';

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
  indicaUsuarioSelecionado: boolean = false;
  exibirFormularioPaciente: boolean = true;
  exibirDadosPessoais: boolean = false;
  exibirDadosTrabalho: boolean = false;
  tipoFormulario: string = null;
  localTrabalho: string = null;
  endereco: string = null;
  especialidade: string = null;
  dadosMedico: Array<Medico> = new Array<Medico>();
  indexRegistro: number = -1;
  exibirIconeSalvar: boolean = true;

  constructor(private service: HttpService, private router: Router, private getParamsRouter: ActivatedRoute) {
    this.getParamsRouter.params.subscribe(params => {
      this.tipoUsuario = params['tipoUsuario'];
      this.exibirFormularioCadastroUsuario(this.tipoUsuario)
    });
  }

  ngOnInit() {
    $('.modal').modal();
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

  public exibirFormularioCadastroUsuario(tipoUsuario: string) {
    this.indicaUsuarioSelecionado = true;

    if(tipoUsuario == "paciente") {
      this.exibirFormularioPaciente = true;
    } else {
      this.exibirFormularioPaciente = false;
      this.exibirDadosPessoais = true;
      this.exibirDadosTrabalho = false;
    }
  }

  public alternarFormularioTrabalho() {
    this.exibirDadosPessoais = false;
    this.exibirDadosTrabalho = true;
  }

  public alternarFormularioPessoal() {
    this.exibirDadosPessoais = true;
    this.exibirDadosTrabalho = false;
  }

  public validarDadosMedicos() {
    if(isNullOrUndefined(this.localTrabalho)) {
      return alert("O campo NOME LOCAL TRABALHO não foi preenchido.");      
    }

    if(isNullOrUndefined(this.endereco)) {
      return alert("O campo ENDEREÇO não foi preenchido.");      
    }

    if(isNullOrUndefined(this.especialidade)) {
      return alert("O campo ESPECIALIDADE não foi preenchido.");      
    }

    this.inserirDadosMedico();
  }

  public inserirDadosMedico() {
    if(this.indexRegistro >= 0) {
      this.atualizarRegistroMedico(this.indexRegistro);      
      this.indexRegistro = -1;
      alert("Atualizado com sucesso!");
    } else {
      this.dadosMedico.push(this.criarDadosMedico());
      alert("Adicionado com sucesso!");
    }
    this.limparDadosMedico();
    //this.exibirIconeSalvar = false;
  }

  public criarDadosMedico() {
    let dados = new Medico();
    dados.NomeLocalTrabalho = this.localTrabalho;
    dados.Endereco = this.endereco;
    dados.Especialidade = this.especialidade;

    return dados;
  }

  public limparDadosMedico() {
    this.localTrabalho = null;
    this.endereco = null;
    this.especialidade = null;
    //this.exibirIconeSalvar = true;
  }

  public abrirModalEdicao() {
    if(this.dadosMedico.length > 0) {
      $('#modalMedico').modal('open');
    } else {
      return alert("Não existem dados cadastrado.")
    }
  }

  public fecharModalEdicao() {
    $('#modalMedico').modal('close');
  }

  public atualizarRegistroMedico(index: number) {
    this.dadosMedico[index].NomeLocalTrabalho = this.localTrabalho;
    this.dadosMedico[index].Endereco = this.endereco;
    this.dadosMedico[index].Especialidade = this.especialidade;
  }

  public carregarRegistroMedicoSelecionado(index: number) {
    this.localTrabalho = this.dadosMedico[index].NomeLocalTrabalho;
    this.endereco = this.dadosMedico[index].Endereco;
    this.especialidade = this.dadosMedico[index].Especialidade;
    this.indexRegistro = index;
    //this.exibirIconeSalvar = true;
    this.fecharModalEdicao();
  }
}
