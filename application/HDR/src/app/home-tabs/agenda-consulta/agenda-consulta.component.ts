import { Component, OnInit, Input } from '@angular/core';
import { isNull, isNullOrUndefined } from 'util';
import { Consulta } from '../../rules/Consulta';
import { HttpService } from '../../services/http.service';

declare let $: any;

@Component({
  selector: 'app-agenda-consulta',
  templateUrl: './agenda-consulta.component.html',
  styleUrls: ['./agenda-consulta.component.scss'],
})
export class AgendaConsultaComponent implements OnInit {

  crmMedico: string;
  nomeMedico: string;
  nomeClinicaMedica: string;
  dataConsultaMedica: Date;
  enderecoClinica: string;
  exibeLoading: boolean = false;
  consultas: Array<Consulta> = new Array<Consulta>();
  @Input() idUsuario: number;

  constructor(private service: HttpService) { }

  ngOnInit() {
    $('.modal').modal();

    if(this.idUsuario > 0) {
      this.exibeLoading = true;
      this.carregarConsultas(this.idUsuario);
    }
  }

  public abrirModalAgenda() {
    $('#modalAgenda').modal('open');
  }

  public fecharModal() {
    $('#modalAgenda').modal('hide');
  }

  public abrir() {
    $('.collapsible').collapsible();
  }

  public validarDadosConsultaMedica() {
    if(isNullOrUndefined(this.nomeMedico)) {
      return alert("O campo NOME MÉDICO não foi preenchido.");
    }

    if(isNullOrUndefined(this.nomeClinicaMedica)) {
      return alert("O campo NOME CLÍNICA não foi preenchido.");
    }

    if(isNullOrUndefined(this.dataConsultaMedica)) {
      return alert("O campo DATA DA CONSULTA não foi preenchido.");
    }

    this.exibeLoading = true;
    this.cadastrarConsulta();
  }

  public cadastrarConsulta() {
    let consulta = this.criarConsulta();

    this.service.salvarConsulta(consulta)
    .subscribe(resp => {
      alert("Consulta cadastrada com sucesso.");
      this.fecharModal();
      this.limparDadosConsulta();
      this.carregarConsultas(this.idUsuario);
    }, (error) => {
      alert("Falha ao tentar cadastrar uma nova consulta.");
    });

    this.exibeLoading = false;
  }

  public limparDadosConsulta() {
    this.crmMedico = null;
    this.dataConsultaMedica = new Date();
    this.enderecoClinica = null;
    this.nomeClinicaMedica = null;
    this.nomeMedico = null;
  }

  public criarConsulta() {
    var consulta = new Consulta();
    consulta.Crm = this.crmMedico;
    consulta.DataConsulta = this.dataConsultaMedica;
    consulta.Endereco = this.enderecoClinica;
    consulta.IdConsulta = 0;
    consulta.IdUsuario = this.idUsuario;
    consulta.NomeHospital = this.nomeClinicaMedica;
    consulta.NomeMedico = this.nomeMedico;

    return consulta;
  }

  public carregarConsultas(idUsuario: number) {
    this.service.carregarConsultas(idUsuario)
    .subscribe(resp => {
      this.consultas = resp;
    }, (error) => {
      console.log("Houve um erro ao carregar as consultas.");
    });
    this.exibeLoading = false;
  }
}
