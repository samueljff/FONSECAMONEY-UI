import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [ RelatorioLancamentosComponent ],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,

    RelatoriosRoutingModule,
    SharedModule
  ]
})
export class RelatoriosModule { }
