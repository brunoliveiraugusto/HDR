import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Arquivo } from '../rules/Arquivo';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  idUsuario: number;
  indicaPaciente: boolean;
  idUsuarioMedico: number;
  
  chaveAcessoMedico: string = null;

  arquivos: Array<string> = new Array<string>();
  arquivoExibido: string = null;
  nomeArquivo: string = null;
  novoNomeArquivo: string = null;
  listaArquivos: Array<Arquivo> = new Array<Arquivo>();

  constructor(private service: HttpService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.idUsuario = Number.parseInt(params['idUsuario']);
      this.indicaPaciente = params['indicaPaciente'] == "true";
      this.idUsuarioMedico = Number.parseInt(params['idUsuarioMedico']);
      if(this.idUsuario > 0 && this.indicaPaciente) {
        this.carregarArquivos();
      }
    });
  }

  ngOnInit() {
    $(document).ready(function(){
      $('.tabs').tabs();
    });

    $('.modal').modal();
  }

  public gerarChaveMedico() {
    if(isNaN(this.idUsuario) || this.idUsuario < 0) {
      return alert("É necessário realizar a autenticação para usar esse recurso.");
    } else {
      this.service.gerarChaveAcessoMedico(this.idUsuario)
      .subscribe((chave) => {
      this.chaveAcessoMedico = chave;
    },
    (error) => {
      alert("Erro ao gerar chave.");
    });
    } 
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

  public downloadArquivo(nomeArq: string, arqBase: string) {
    const linkSource = arqBase; 
    const downloadLink = document.createElement("a");
    const fileName = nomeArq;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  public validarArquivoAnexado() {
    if(isNullOrUndefined(this.arquivoExibido))
      return alert("Nenhum arquivo pdf foi selecionado.");    
    
    this.salvarArquivoAnexado();
  }

  public salvarArquivoAnexado() {
    if(!isNullOrUndefined(this.novoNomeArquivo)) {
      this.nomeArquivo = this.ajustarNomeArquivoSelecionado();
    }

    var objArquivo =  this.preencherObjetoArquivo(); 

    this.service.salvarArquivoAnexado(objArquivo)
    .subscribe((result) => {
      alert("O arquivo foi salvo com sucesso.");
      if(result) {
        this.carregarArquivos();
      }
    }, (error) => {
      alert("Houve um erro ao salvar o arquivo.");
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

    return arquivo;
  }

  public carregarArquivos() {
    this.service.carregarArquivosAnexados(this.idUsuario)
    .subscribe((result) => {
      this.listaArquivos = result;
    }, (error) => {
      console.log("Erro ao carregar os arquivos salvo.")
    });
  }

  public abrirModal() {
    $('#modalArquivo').modal('open');
  }

  public fecharModal() {
    $('#modalArquivo').modal('hide');
  }
}
