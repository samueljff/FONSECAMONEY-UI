import { LancamentosPesquisaComponent } from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { SharedModule } from "../shared/shared.module";
import { LancamentosRountingModule } from "./lancamento-routing.module";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { RouterModule } from "@angular/router";

import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from "primeng/tabview";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { SelectButtonModule } from "primeng/selectbutton";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputMaskModule } from "primeng/inputmask";
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    FormsModule,
    InputMaskModule,
    RouterModule,
    ReactiveFormsModule,
    FileUploadModule,
    ProgressSpinnerModule,

    SharedModule,
    LancamentosRountingModule
  ],
})
export class LancamentosModule {}
