import { Component, OnInit } from '@angular/core';
import { isNull, isUndefined, isNullOrUndefined } from 'util';
import { HttpService } from 'src/app/services/http.service';
import { Usuario } from '../../rules/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { DadosMedico } from 'src/app/rules/DadosMedico';

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
  dadosMedico: Array<DadosMedico> = new Array<DadosMedico>();
  indexRegistro: number = -1;
  exibirIconeSalvar: boolean = false;

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
      this.router.navigate(['/login']);
      this.dadosMedico = new Array<DadosMedico>();
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
    this.usuario.DadosMedico = this.dadosMedico;

    return this.usuario;
  }

  public indicaCampoVazio() {
    
    if((this.tipoUsuario == "medico" && this.dadosMedico.length <= 0 && (isNull(this.nomeCompleto) || this.nomeCompleto == "")) || isNull(this.nomeCompleto) || this.nomeCompleto == "") {
      alert("O campo NOME COMPLETO não foi preenchido.");  
      return true;
    }

    if((this.tipoUsuario == "medico" && this.dadosMedico.length <= 0 && (isNull(this.cpfCrm) || this.cpfCrm == "")) || isNull(this.cpfCrm) || this.cpfCrm == "") {
      alert("O campo CPF/CRM não foi preenchido.");  
      return true;
    }

    if((this.tipoUsuario == "medico" && this.dadosMedico.length <= 0 && (isNull(this.chaveAcesso) || this.chaveAcesso == "")) || isNull(this.chaveAcesso) || this.chaveAcesso == "") {
      alert("O campo SENHA não foi preenchido.");  
      return true;
    }

    if((this.tipoUsuario == "medico" && this.dadosMedico.length <= 0 && (isNull(this.email) || this.email == "")) || isNull(this.email) || this.email == "") {
      alert("O campo E-MAIL não foi preenchido.");  
      return true;
    }

    if((this.tipoUsuario == "medico" && this.dadosMedico.length <= 0 && isNull(this.dataNascimento)) || isNull(this.dataNascimento)) {
      alert("O campo DATA DE NASCIMENTO não foi preenchido.");  
      return true;
    }
  }

  public validarCamposUsuario() {

    if(this.indicaCampoVazio()) {
      return false;
    }

    if(this.tipoUsuario == "medico" && this.indicaCamposEspecialidadeMedicaVazio()) {
      return false;
    }

    this.cadastrarNovoUsuario();
  }

  public indicaCamposEspecialidadeMedicaVazio() {
    if(this.dadosMedico.length <= 0 && (isNull(this.localTrabalho) || this.localTrabalho == "") && (isNull(this.endereco) || this.endereco == "") && (isNull(this.especialidade) || this.especialidade == "")) {
      alert("Nenhuma especialidade médica foi informada. Por favor, informe no mínimo uma.");
      return true;
    }

    if(isNull(this.localTrabalho)) {
      alert("O campo NOME LOCAL DE TRABALHO não foi preenchido.");
      return true;
    }

    if(isNull(this.endereco)){
      alert("O campo ENDEREÇO não foi preenchido.");
      return true;
    }

    if(isNull(this.especialidade)) {
      alert("O campo ESPECIALIDADE não foi preenchido.");
      return true;
    }

    if(!isNull(this.localTrabalho) && !isNull(this.endereco) && !isNull(this.especialidade)) {
      this.inserirDadosMedico();
    }
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
    if(!this.indicaCampoVazio()) {
      this.exibirDadosPessoais = false;
      this.exibirDadosTrabalho = true;
    }
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
      alert("Especialidade atualizada com sucesso!");
    } else {
      this.dadosMedico.push(this.criarDadosMedico());
      alert("Especialidade adicionada com sucesso!");
    }
    this.limparDadosMedico();
    this.exibirIconeSalvar = false;
  }

  public criarDadosMedico() {
    let dados = new DadosMedico();
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
    this.exibirIconeSalvar = true;
    this.fecharModalEdicao();
  }
}
