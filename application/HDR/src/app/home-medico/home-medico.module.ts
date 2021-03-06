import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SolicitacoesComponent } from '../home-medico/solicitacoes/solicitacoes.component';

import { HomeMedicoComponent } from './home-medico.component';
import { ComponentsModule } from '../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeMedicoComponent
      }
    ])
  ],
  declarations: [HomeMedicoComponent, SolicitacoesComponent]
})
export class HomeMedicoModule {}
