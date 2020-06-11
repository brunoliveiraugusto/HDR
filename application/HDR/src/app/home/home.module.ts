import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AnexoComponent } from '../home-tabs/anexo/anexo.component';
import { ChaveMedicoComponent } from '../home-tabs/chave-medico/chave-medico.component';
import { ComponentsModule } from '../components.module';
import { AgendaConsultaComponent } from '../home-tabs/agenda-consulta/agenda-consulta.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, AnexoComponent, ChaveMedicoComponent, AgendaConsultaComponent]
})
export class HomePageModule {}
