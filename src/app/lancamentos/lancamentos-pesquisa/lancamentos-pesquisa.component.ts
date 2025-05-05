import { Lancamento } from "../lancamentoModel";
import { LancamentoFiltro, LancamentoService } from "../lancamento.service";
import { ErrorHandlerService } from "src/app/core/error-handler.service";

import { Component, OnInit, ViewChild } from "@angular/core";

import { ConfirmationService, LazyLoadEvent, MessageService } from "primeng/api";

@Component({
  selector: "app-lancamentos-pesquisa",
  templateUrl: "./lancamentos-pesquisa.component.html",
  styles: [],
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros: number = 0;
  filtro = new LancamentoFiltro();
  lancamentos: Lancamento[] = [];
  @ViewChild ('tabela') grid: any; 

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerservice: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    //this.pesquisar();
  }

  pesquisar(pagina: number = 0): void {
      this.filtro.pagina = pagina;
      this.lancamentoService.pesquisar(this.filtro).then((resultado) => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    }).catch(erro => {
      this.errorHandlerservice.handle(erro);
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
     if (event.sortField) {
      this.filtro.ordenarPor = event.sortField;
      this.filtro.ordenacao = event.sortOrder === 1 ? 'asc' : 'desc';
    }
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any){
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      this.grid.reset();
      this.messageService.add({severity: 'success', detail: 'Lançamento excluído com sucesso!'});
    }).catch(erro => {
      this.errorHandlerservice.handle(erro);
    });
  }

}
