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
  chaveAcessoMedico: string = null;

  arquivos: Array<string> = new Array<string>();
  arquivoExibido: string = null;
  nomeArquivo: string = null;

  constructor(private service: HttpService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.idUsuario = Number.parseInt(params['idUsuario']);
    });
  }

  ngOnInit() {
    $(document).ready(function(){
      $('.tabs').tabs();
    });
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
      for(let i = 0; i < event.target.files.length; i++) {
        let file = null;
        var reader = new FileReader();
        file = event.target.files[i];

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
  }

  public downloadPdf() {
    const linkSource = this.arquivoExibido; 
    const downloadLink = document.createElement("a");
    const fileName = "teste.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  public validarPdfAnexado() {
    if(isNullOrUndefined(this.arquivoExibido))
      return alert("Nenhum arquivo pdf foi selecionado.");    
    
    this.salvarPdfAnexado();
  }

  public salvarPdfAnexado() {
    var objArquivo =  this.preencherObjetoArquivo(); 

    this.service.salvarArquivoAnexado(objArquivo)
    .subscribe((result) => {
      alert("O arquivo selecionado foi salvo com sucesso.")
    }, (error) => {
      alert("Houve um erro ao salvar o arquivo.");
    });
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
    
  }
}
