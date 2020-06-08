import { Component, OnInit, Input } from '@angular/core';
import { Arquivo } from 'src/app/rules/Arquivo';
import { isNullOrUndefined, isNull } from 'util';
import { HttpService } from 'src/app/services/http.service';
import { Medico } from 'src/app/rules/Medico';

declare let $: any;

@Component({
  selector: 'app-anexo',
  templateUrl: './anexo.component.html',
  styleUrls: ['./anexo.component.scss'],
})
export class AnexoComponent implements OnInit {

  novoNomeArquivo: string = null;
  listaArquivos: Array<Arquivo> = new Array<Arquivo>();
  arquivos: Array<string> = new Array<string>();
  nomeArquivo: string = null;
  arquivoExibido: string = null;
  exibirFormMedico: boolean = false;
  crmDigitado: string = null;
  medico: Medico = new Medico();
  exibeLoading: boolean = false;
  @Input() idUsuario: number;
  @Input() indicaPaciente: boolean;
  @Input() idUsuarioMedico: number;

  constructor(private service: HttpService) { }

  ngOnInit() {
    $('.modal').modal();

    if(this.idUsuario > 0 && this.indicaPaciente) {
      this.exibeLoading = true;
      this.carregarArquivos();
    }
  }

  ngAfterViewInit() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }

  public abrir() {
    $('.collapsible').collapsible();
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
        this.carregarArquivos();
        this.novoNomeArquivo = null;
        this.arquivoExibido = null;
        this.exibirFormMedico = false;
        this.crmDigitado = null;
        this.medico = new Medico();
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

  
  public downloadArquivo(nomeArq: string, arqBase: string) {
    const linkSource = arqBase; 
    const downloadLink = document.createElement("a");
    const fileName = nomeArq;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  public preencherObjetoArquivo() {
    var arquivo = new Arquivo();
    arquivo.ArquivoAnexado = this.arquivoExibido;
    arquivo.DataCriacao = new Date();
    arquivo.DataExclusao = null;
    arquivo.IdUsuario = this.idUsuario;
    arquivo.NomeArquivo = this.nomeArquivo;
    arquivo.IdUsuarioMedico = this.medico.idMedico;
    arquivo.IndicaCadastroMedico = false;

    return arquivo;
  }

  public carregarArquivos() {
    this.service.carregarArquivosAnexados(this.idUsuario)
    .subscribe((result) => {
      this.exibeLoading = false;
      this.listaArquivos = result;
    }, (error) => {
      console.log("Erro ao carregar os documentos salvo.")
    });
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

  public exibirFormularioMedico() {
    this.exibirFormMedico = true;
  }

  public buscarMedicoPorCrm() {
    if(isNull(this.crmDigitado) || this.crmDigitado == "") {
      return;
    } else {
      this.service.buscarMedico(this.crmDigitado)
      .subscribe((result) => {
        this.medico = result;
      }, (error) => {
      })
    }
  }
}
