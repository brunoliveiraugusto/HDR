import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  exibeAbaAnexos: boolean = true;
  exibeAbaConsultas: boolean = false;
  exibeAbaMedico: boolean = false;
  @Output() idUsuario: number;
  @Output() indicaPaciente: boolean;
  @Output() idUsuarioMedico: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.idUsuario = Number.parseInt(params['idUsuario']);
      this.indicaPaciente = params['indicaPaciente'] == "true";
      this.idUsuarioMedico = Number.parseInt(params['idUsuarioMedico']);
    });
  }

  ngOnInit() {
    $(document).ready(function(){
      $('.tabs').tabs();
    });
  }

  public exibirAbaAnexos() {
    this.exibeAbaAnexos = true;
    this.exibeAbaConsultas = false;
    this.exibeAbaMedico = false;
  }

  public exibirAbaConsultas() {
    this.exibeAbaAnexos = false;
    this.exibeAbaConsultas = true;
    this.exibeAbaMedico = false;
  }

  public exibirAbaMedico() {
    this.exibeAbaAnexos = false;
    this.exibeAbaConsultas = false;
    this.exibeAbaMedico = true;
  }
}
