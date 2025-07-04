import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'lancamentos',
    component: RelatorioLancamentosComponent,
    canActivate: [AuthGuard],
    data: ['ROLE_PESQUISAR_LANCAMENTO']
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
