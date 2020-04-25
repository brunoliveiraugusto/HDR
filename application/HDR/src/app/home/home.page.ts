import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor() {}

  ngOnInit() {
    $(document).ready(function(){
      $('.tabs').tabs();
    });
  }

}
