import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";
import { CadastroPessoaComponent } from "./cadastro-pessoa/cadastro-pessoa.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
  { 
    path: 'pessoas', component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  { 
    path: 'pessoas/nova', component: CadastroPessoaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  { 
    path: 'pessoas/:codigo', component: CadastroPessoaComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PessoasRoutingModule { }