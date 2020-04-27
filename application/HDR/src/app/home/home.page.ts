import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  codigoAcessoMedico: string = null;

  constructor() {
    this.codigoAcessoMedico = "GJASD67S";
  }

  ngOnInit() {
    $(document).ready(function(){
      $('.tabs').tabs();
    });
  }

}
