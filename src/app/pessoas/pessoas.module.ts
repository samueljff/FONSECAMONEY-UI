import { CadastroPessoaComponent } from "./cadastro-pessoa/cadastro-pessoa.component";
import { PessoasGridComponent } from "./pessoas-grid/pessoas-grid.component";
import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";
import { SharedModule } from "../shared/shared.module";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { CalendarModule } from "primeng/calendar";
import { InputMaskModule } from "primeng/inputmask";
import { PessoasRoutingModule } from "./pessoas-routing.module";

@NgModule({
  declarations: [
    CadastroPessoaComponent,
    PessoasGridComponent,
    PessoasPesquisaComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    InputMaskModule,
    FormsModule,

    SharedModule,
    PessoasRoutingModule
  ],
  exports: [
  ],
})
export class PessoasModule {}
