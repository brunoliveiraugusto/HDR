import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChaveMedicoComponent } from '../chave-medico/chave-medico.component';
import { LoadingComponent } from '../../loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChaveMedicoComponent
      }
    ])
  ],
  declarations: [ChaveMedicoComponent, LoadingComponent]
})
export class ChaveMedicoModule {}
