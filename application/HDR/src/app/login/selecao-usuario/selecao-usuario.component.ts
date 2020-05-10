import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-selecao-usuario',
  templateUrl: './selecao-usuario.component.html',
  styleUrls: ['./selecao-usuario.component.scss'],
})
export class SelecaoUsuarioComponent implements OnInit {

  tipoUsuario: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  public criarUsuario() {
    if(isNullOrUndefined(this.tipoUsuario)) {
      return alert("Selecione o usuário que deseja criar para continuar.");
    } else {
      this.router.navigate(['/cadastro-usuario', {'tipoUsuario': this.tipoUsuario}]);
    }
  }

}
