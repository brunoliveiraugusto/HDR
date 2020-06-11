import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AgendaConsultaComponent } from '../agenda-consulta/agenda-consulta.component';
import { ComponentsModule } from '../../components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AgendaConsultaComponent
      }
    ])
  ],
  declarations: [AgendaConsultaComponent]
})
export class AgendaConsultaModule {}
