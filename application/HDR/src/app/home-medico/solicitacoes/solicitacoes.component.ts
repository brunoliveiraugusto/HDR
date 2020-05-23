import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Arquivo } from 'src/app/rules/Arquivo';

declare let $: any;

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss'],
})
export class SolicitacoesComponent implements OnInit {

  solicitacoes: Array<Arquivo> = new Array<Arquivo>();
  @Input() idUsuario: number;
  @Input() indicaPaciente: boolean;
  @Input() idUsuarioMedico: number;
  
  constructor(private service: HttpService) { }

  ngOnInit() {
    if(this.idUsuarioMedico > 0 && !this.indicaPaciente) {
      this.carregarSolicitacoes();
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

  public carregarSolicitacoes() {
    this.service.carregarSolicitacoes(this.idUsuarioMedico)
    .subscribe((result) => {
      this.solicitacoes = result;
    }, (error) => {
      console.log("Erro ao carregar as solicitações.");
    })
  }

  public downloadArquivo(nomeArq: string, arqBase: string) {
    const linkSource = arqBase; 
    const downloadLink = document.createElement("a");
    const fileName = nomeArq;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  public aprovarSolicitacao(idArquivo: number) {
    if(!isNaN(idArquivo) && idArquivo > 0) {
      this.service.aprovarSolicitacaoDocumento(idArquivo)
      .subscribe((result) => {
        alert("Solicitação aprovada.");
        this.carregarSolicitacoes();
      }, (error) => {
        alert("Houve uma falha ao aprovar a solicitação.");
      });
    } else {
      alert("Houve uma falha ao aprovar a solicitação.");
    }
  }
}
