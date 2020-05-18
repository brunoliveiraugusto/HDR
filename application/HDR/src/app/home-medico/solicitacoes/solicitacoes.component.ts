import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Arquivo } from 'src/app/rules/Arquivo';

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
  
  constructor(private service: HttpService) { 
    if(this.idUsuarioMedico > 0 && !this.indicaPaciente) {
      this.carregarSolicitacoes();
    }
  }

  ngOnInit() {}

  public carregarSolicitacoes() {
    this.service.carregarSolicitacoes(this.idUsuarioMedico)
    .subscribe((result) => {
      this.solicitacoes = result;
    }, (error) => {
      console.log("Erro ao carregar as solicitações.");
    })
  }
}
