import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.scss'],
})
export class HomeMedicoComponent implements OnInit {

  @Output() idUsuario: number;
  @Output() indicaPaciente: boolean;
  @Output() idUsuarioMedico: number;
  
  constructor(private route: ActivatedRoute, private router: Router) { 
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

  public sair() {
    this.router.navigate(['/login']);
  }
}
