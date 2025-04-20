import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [
    LancamentoService,
    PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
