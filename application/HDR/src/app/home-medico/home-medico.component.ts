import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { HttpService } from '../services/http.service';
import { Arquivo } from '../rules/Arquivo';

declare let $: any;

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.scss'],
})
export class HomeMedicoComponent implements OnInit {

  nomeArquivo: string = null;
  novoNomeArquivo: string = null;
  arquivos: Array<string> = new Array<string>();
  arquivoExibido: string = null;
  exibeLoading: boolean = false;
  chaveAcessoMedico: string = null;
  exibeAbaSolicitacoes: boolean = true;
  exibeAbaNovoAnexo: boolean = false;
  @Output() idUsuario: number = 0;
  @Output() indicaPaciente: boolean;
  @Output() idUsuarioMedico: number;
  
  constructor(private route: ActivatedRoute, private router: Router, private service: HttpService) { 
    this.route.params.subscribe(params => {
      this.idUsuario = Number.parseInt(params['idUsuario']);
      this.indicaPaciente = params['indicaPaciente'] == "true";
      this.idUsuarioMedico = Number.parseInt(params['idUsuarioMedico']);
    });
  }

  ngOnInit() {
    $('.modal').modal();

    $(document).ready(function(){
      $('.tabs').tabs();
    });
  }

  public sair() {
    this.router.navigate(['/login']);
  }

  public carregarPdf(event) { 
    if (event.target.files != null && event.target.files.length > 0) {;
      //this.quantidadeImagens = event.target.files.length;
      if(event.target.files.length > 1) {
        this.fecharModal();
        return alert("É permitido selecionar apenas um arquivo por vez.");
      }

      for(let i = 0; i < event.target.files.length; i++) {
        let file = null;
        var reader = new FileReader();
        file = event.target.files[i];
        this.nomeArquivo = file.name;
        reader.readAsDataURL(file);

        reader.onload = (file) => { 
          this.arquivos[i] = file.target.result as string;
          
          if(isNullOrUndefined(this.arquivoExibido))
            this.arquivoExibido = this.arquivos[0];
        }, function(error) {
          console.log(error);
        } 
      }
    }
    this.abrirModal();
  }

  public abrirModal() {
    $('#modalArquivo').modal('open');
  }

  public fecharModal() {
    $('#modalArquivo').modal('hide');
  }

  public validarArquivoAnexado() {
    if(isNullOrUndefined(this.arquivoExibido))
      return alert("Nenhum documento foi selecionado.");    
    
    this.exibeLoading = true;
    this.salvarArquivoAnexado();
  }

  public salvarArquivoAnexado() {
    if(!isNullOrUndefined(this.novoNomeArquivo)) {
      this.nomeArquivo = this.ajustarNomeArquivoSelecionado();
    }

    var objArquivo =  this.preencherObjetoArquivo(); 

    this.service.salvarArquivoAnexado(objArquivo)
    .subscribe((result) => {
      alert("O documento foi salvo com sucesso.");
      if(result) {
        this.novoNomeArquivo = null;
        this.arquivoExibido = null;
        this.exibeLoading = false;
      }
    }, (error) => {
      alert("Houve um erro ao salvar o documento.");
    });
  }

  public ajustarNomeArquivoSelecionado() {
    let nomeArquivoPartido = this.nomeArquivo.split(".");
    this.novoNomeArquivo += "."+nomeArquivoPartido[nomeArquivoPartido.length - 1];
    return this.novoNomeArquivo;
  }

  public preencherObjetoArquivo() {
    var arquivo = new Arquivo();
    arquivo.ArquivoAnexado = this.arquivoExibido;
    arquivo.DataCriacao = new Date();
    arquivo.DataExclusao = null;
    arquivo.IdUsuario = this.idUsuario;
    arquivo.NomeArquivo = this.nomeArquivo;
    arquivo.IdUsuarioMedico = this.idUsuarioMedico
    arquivo.IndicaCadastroMedico = true;

    return arquivo;
  }

  public validarChaveDigitada() {
    this.service.validarChaveAcessoMedico(this.chaveAcessoMedico)
    .subscribe((resp) => {
      this.idUsuario = resp;
    },(error) => {
      this.exibeLoading = false;
      alert("A chave digitada é inválida.");
    })
  }

  public exibirAbaSolicitacoes() {
    this.exibeAbaSolicitacoes = true;
    this.exibeAbaNovoAnexo = false;
  }

  public exibirAbaNovoAnexo() {
    this.exibeAbaSolicitacoes = false;
    this.exibeAbaNovoAnexo = true;
  }
}
