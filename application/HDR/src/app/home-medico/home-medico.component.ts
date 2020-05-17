import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.scss'],
})
export class HomeMedicoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.tabs').tabs();
    });
  }

}
