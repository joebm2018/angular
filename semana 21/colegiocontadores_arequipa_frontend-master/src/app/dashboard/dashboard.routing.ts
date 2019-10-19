import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {BuscarTipoEventoComponent} from './componentes/tipo-evento/buscar-tipo-evento/buscar-tipo-evento.component';


export const routes: Routes = [
  {
      path: 'dashboard',
      children: [
        { path: '', component: DashboardComponent},
        { path: 'tipo-evento', component:  BuscarTipoEventoComponent, outlet: 'principal'},
        { path: '**', redirectTo: '/login'}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
