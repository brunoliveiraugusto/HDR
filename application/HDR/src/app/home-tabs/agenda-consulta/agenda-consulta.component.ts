import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-agenda-consulta',
  templateUrl: './agenda-consulta.component.html',
  styleUrls: ['./agenda-consulta.component.scss'],
})
export class AgendaConsultaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.modal').modal();
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
}
