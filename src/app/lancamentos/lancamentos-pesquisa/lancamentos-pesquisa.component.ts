import { Lancamento } from "./../lancamento";
import { LancamentoFiltro, LancamentoService } from "../lancamento.service";

import { Component, OnInit } from "@angular/core";

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
    this.pesquisar(pagina);
  }
}
