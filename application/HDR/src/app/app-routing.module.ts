import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login/login.module').then( m => m.LoginComponentModule) },
  { path: 'login', loadChildren: () => import('./login/login/login.module').then( m => m.LoginComponentModule)},
  { path: 'selecao-usuario', loadChildren: () => import('./login/selecao-usuario/selecao-usuario.module').then( m => m.SelecaoUsuarioComponentModule)},
  { path: 'cadastro-usuario', loadChildren: () => import('./login/cadastro-usuario/cadastro-usuario.module').then( m => m.LoginComponentModule)},
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
