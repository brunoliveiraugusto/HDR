import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoadingComponent } from '../../loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ],
  declarations: [LoginComponent, LoadingComponent]
})
export class LoginComponentModule {}
