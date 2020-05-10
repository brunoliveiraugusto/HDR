import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SelecaoUsuarioComponent } from './selecao-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SelecaoUsuarioComponent
      }
    ])
  ],
  declarations: [SelecaoUsuarioComponent]
})
export class SelecaoUsuarioComponentModule {}
