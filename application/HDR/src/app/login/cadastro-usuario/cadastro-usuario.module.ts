import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CadastroUsuarioComponent } from './cadastro-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CadastroUsuarioComponent
      }
    ])
  ],
  declarations: [CadastroUsuarioComponent]
})
export class LoginComponentModule {}
