import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PaginaNaoEcontradaComponent } from "./core/pagina-nao-econtrada.component";
import { NaoAutorizadoComponent } from "./core/nao-autorizado.componente";

const routes: Routes = [
  { path: 'lancamentos', loadChildren: () => import('../app/lancamentos/lancamentos.module').then(m => m.LancamentosModule) },
  { path: 'pessoas', loadChildren: () => import('../app/pessoas/pessoas.module').then(m => m.PessoasModule) },
  {path: 'dashboard', loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule)}, //configuração de rota com carregamento tardio (lazy loading)
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'relatorios', loadChildren: () => import('../app/relatorios/relatorios.module').then(m => m.RelatoriosModule)},

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