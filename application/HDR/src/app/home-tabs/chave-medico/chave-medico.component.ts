import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-chave-medico',
  templateUrl: './chave-medico.component.html',
  styleUrls: ['./chave-medico.component.scss'],
})
export class ChaveMedicoComponent implements OnInit {

  @Input() idUsuario: number;
  chaveAcessoMedico: string = null;
  exibeLoading: boolean = false;

  constructor(private service: HttpService) { }

  ngOnInit() {}
  
  public gerarChaveMedico() {
    if(isNaN(this.idUsuario) || this.idUsuario < 0) {
      return alert("É necessário realizar a autenticação para usar esse recurso.");
    } else {
      this.exibeLoading = true;
        this.service.gerarChaveAcessoMedico(this.idUsuario)
        .subscribe((chave) => {
        this.chaveAcessoMedico = chave;
        this.exibeLoading = false;
      },
      (error) => {
        this.exibeLoading = false;
        alert("Erro ao gerar chave.");
      });
    } 
  }
}
