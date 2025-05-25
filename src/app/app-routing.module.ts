import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PaginaNaoEcontradaComponent } from "./core/pagina-nao-econtrada.component";
import { NaoAutorizadoComponent } from "./core/nao-autorizado.componente";

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEcontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }