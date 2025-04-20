import { Lancamento } from "./../lancamento";
import { LancamentoFiltro, LancamentoService } from "../lancamento.service";

import { Component, OnInit, ViewChild } from "@angular/core";

import { LazyLoadEvent } from "primeng/api";

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

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit(): void {
    //this.pesquisar();
  }

  pesquisar(pagina: number = 0): void {
      this.filtro.pagina = pagina;
      this.lancamentoService.pesquisar(this.filtro).then((resultado) => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
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

  excluir(lancamento: any){
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      this.grid.reset();
    });
  }

}
